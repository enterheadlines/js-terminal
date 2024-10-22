const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('commandInput');

const fileSystem = {
    'file1.txt': 'This is the content of file1.txt.',
    'file2.txt': 'This is the content of file2.txt.',
    'directory1': {},
};

const commands = {
    help: "Available commands: help, clear, date, echo, ls, pwd, whoami, cat, touch, mkdir, rmdir, rm, cp, mv, ping, exit, info, version, weather, history, rename",
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
        window.location.href = "https://www.google.com"; // Redirect to Google
        return "Exiting terminal...";
    },
    info: () => "This is a simulated JS terminal.",
    version: () => "Terminal version 1.0.0",
    weather: () => "Weather is clear with no clouds.",
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
};

commandInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const input = commandInput.value;
        const args = input.split(' ').slice(1);
        const command = input.split(' ')[0];
        
        terminal.innerHTML += `<div class="command-output">> ${input}</div>`;
        
        const result = commands[command] ? 
            (typeof commands[command] === 'function' ? commands[command](args) : commands[command]) : 
            `Unknown command: ${command}`;
        
        terminal.innerHTML += `<div class="command-output">${result}</div>`;
        commands.history(input); // Store command in history
        commandInput.value = '';
        terminal.scrollTop = terminal.scrollHeight; // Auto-scroll to the bottom
    }
});