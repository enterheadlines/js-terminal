  const terminal = document.getElementById('terminal');
    const commandInput = document.getElementById('commandInput');
    const wrapper = document.getElementById("terminalWrapper");

    let isMaximized = false;
    let normalState = { width: "800px", height: "500px", top: "50px", left: "50px" };

    const fileSystem = {
      'file1.txt': 'This is the content of file1.txt.',
      'file2.txt': 'This is the content of file2.txt.',
      'directory1': {},
    };

    const commands = {
      help: `Available commands:<br>
      help, clear, date, echo, ls, pwd, whoami, cat, touch, mkdir, rmdir, rm, cp, mv, ping, exit, info, version, weather, history, rename, joke, discord, github, instagram`,
      clear: () => { terminal.innerHTML = ''; },
      date: () => new Date().toString(),
      echo: (args) => args.join(' '),
      ls: () => Object.keys(fileSystem).join(', '),
      pwd: () => "/user/home",
      whoami: () => "You are logged in as user.",
      cat: (args) => {
        const fileName = args[0];
        return fileSystem[fileName] ? fileSystem[fileName] : `No such file: ${fileName}`;
      },
      touch: (args) => {
        const fileName = args[0];
        if (fileName) {
          fileSystem[fileName] = '';
          return `Created file ${fileName}`;
        }
        return 'Usage: touch <filename>';
      },
      mkdir: (args) => {
        const dirName = args[0];
        if (dirName) {
          fileSystem[dirName] = {};
          return `Created directory ${dirName}`;
        }
        return 'Usage: mkdir <directoryname>';
      },
      rmdir: (args) => {
        const dirName = args[0];
        if (fileSystem[dirName] && typeof fileSystem[dirName] === 'object') {
          delete fileSystem[dirName];
          return `Removed directory ${dirName}`;
        }
        return `No such directory: ${dirName}`;
      },
      rm: (args) => {
        const fileName = args[0];
        if (fileSystem[fileName]) {
          delete fileSystem[fileName];
          return `Removed file ${fileName}`;
        }
        return `No such file: ${fileName}`;
      },
      cp: (args) => {
        const source = args[0];
        const destination = args[1];
        if (fileSystem[source]) {
          fileSystem[destination] = fileSystem[source];
          return `Copied ${source} to ${destination}`;
        }
        return `No such file: ${source}`;
      },
      mv: (args) => {
        const source = args[0];
        const destination = args[1];
        if (fileSystem[source]) {
          fileSystem[destination] = fileSystem[source];
          delete fileSystem[source];
          return `Moved ${source} to ${destination}`;
        }
        return `No such file: ${source}`;
      },
      ping: (args) => {
        const target = args[0] || 'localhost';
        return `Pinging ${target}... Response: 64 bytes from ${target}: icmp_seq=1 ttl=64 time=0.1 ms`;
      },
      exit: () => {
        window.location.href = "https://www.google.com";
        return "Exiting terminal...";
      },
      info: () => "This is a simulated JS terminal. Just for fun.",
      version: () => "Terminal version 2",
      weather: () => {
        const reports = [
          "Sunny with clear skies.",
          "Partly cloudy with a light breeze.",
          "Rain showers expected later today.",
          "Storm warning: stay indoors!",
          "Snow is falling outside. Grab a coat!"
        ];
        return reports[Math.floor(Math.random() * reports.length)];
      },
      history: (() => {
        const history = [];
        return (input) => {
          if (input) history.push(input);
          return history.join(', ');
        };
      })(),
      rename: (args) => {
        const oldName = args[0];
        const newName = args[1];
        if (fileSystem[oldName]) {
          fileSystem[newName] = fileSystem[oldName];
          delete fileSystem[oldName];
          return `Renamed ${oldName} to ${newName}`;
        }
        return `No such file: ${oldName}`;
      },
      joke: () => {
        const jokes = [
          "Why don’t scientists trust atoms? Because they make up everything.",
          "Why did the computer go to the doctor? Because it caught a virus.",
          "Why was the math book sad? It had too many problems.",
          "Why did the scarecrow win an award? Because he was outstanding in his field.",
          "Why can’t your nose be 12 inches long? Because then it would be a foot."
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
      },
      discord: () => {
        window.open("https://discord.gg/CEfhTm49jw", "_blank");
        return "Opening Discord...";
      },
      github: () => {
        window.open("https://github.com/enterheadlines/js-terminal", "_blank");
        return "Opening GitHub...";
      },
      instagram: () => {
        window.open("https://www.instagram.com/infamy__studios/#", "_blank");
        return "Opening Instagram...";
      },
    };

    // Welcome message
    terminal.innerHTML = `<div class="command-output">
      Welcome to the JS Terminal v2<br>
      This is just for fun, not a real working terminal.<br>
      Type 'help' to see available commands.<br>
      Try 'discord', 'github', or 'instagram' to visit my pages.
    </div>`;

    // Command handler
    commandInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        const input = commandInput.value.trim();
        const args = input.split(' ').slice(1);
        const command = input.split(' ')[0];

        terminal.innerHTML += `<div class="command-output">> ${input}</div>`;

        const result = commands[command] ? 
          (typeof commands[command] === 'function' ? commands[command](args) : commands[command]) : 
          `Unknown command: ${command}`;

        terminal.innerHTML += `<div class="command-output">${result}</div>`;
        commands.history(input);
        commandInput.value = '';
        terminal.scrollTop = terminal.scrollHeight;
      }
    });

    // Draggable terminal
    const header = document.getElementById("terminalHeader");
    let offsetX = 0, offsetY = 0, isDragging = false;

    header.addEventListener("mousedown", (e) => {
      if (!wrapper.classList.contains("minimized") && !isMaximized) {
        isDragging = true;
        offsetX = e.clientX - wrapper.offsetLeft;
        offsetY = e.clientY - wrapper.offsetTop;
      }
    });
    document.addEventListener("mouseup", () => isDragging = false);
    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        wrapper.style.left = (e.clientX - offsetX) + "px";
        wrapper.style.top = (e.clientY - offsetY) + "px";
      }
    });

    // Buttons
    document.getElementById("closeBtn").addEventListener("click", () => {
      alert("Terminal closed. Secret unlocked!");
      document.getElementById("secret-btn").style.display = "block";
    });

    document.getElementById("minimizeBtn").addEventListener("click", () => {
      wrapper.classList.add("minimized");
    });

    wrapper.addEventListener("click", () => {
      if (wrapper.classList.contains("minimized")) {
        wrapper.classList.remove("minimized");
      }
    });

    document.getElementById("maximizeBtn").addEventListener("click", () => {
      if (!isMaximized) {
        // Save current state
        normalState = {
          width: wrapper.style.width || "800px",
          height: wrapper.style.height || "500px",
          top: wrapper.style.top || "50px",
          left: wrapper.style.left || "50px"
        };
        wrapper.style.width = "100%";
        wrapper.style.height = "100%";
        wrapper.style.top = "0";
        wrapper.style.left = "0";
        isMaximized = true;
      } else {
        // Restore
        wrapper.style.width = normalState.width;
        wrapper.style.height = normalState.height;
        wrapper.style.top = normalState.top;
        wrapper.style.left = normalState.left;
        isMaximized = false;
      }
    });