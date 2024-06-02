class CommandStack {
    constructor() {
        this.undoStack = [];
        this.redoStack = [];
    }

    // 执行命令并将其添加到undo栈
    execute(command) {
        command.execute();
        this.undoStack.push(command);
        this.redoStack.length = 0; // 清空redo栈
    }

    // 执行undo操作
    undo() {
        if (this.undoStack.length > 0) {
            const command = this.undoStack.pop();
            command.undo();
            this.redoStack.push(command);
        }
    }

    // 执行redo操作
    redo() {
        if (this.redoStack.length > 0) {
            const command = this.redoStack.pop();
            command.execute();
            this.undoStack.push(command);
        }
    }
}

// 示例命令类
class SimpleCommand {
    constructor(state) {
        this.state = state;
        this.oldState = null;
    }

    execute() {
        if (this.oldState === null) {
            this.oldState = this.state;
            this.state = 'new state'; // 假设执行了某个操作，改变了状态
        }
        console.log('Executing command:', this.state);
    }

    undo() {
        if (this.oldState !== null) {
            const temp = this.state;
            this.state = this.oldState;
            this.oldState = temp;
        }
        console.log('Undoing command:', this.state);
    }
}

// 使用示例
const stack = new CommandStack();
const command1 = new SimpleCommand('initial state');
stack.execute(command1); // 执行命令并添加到undo栈
stack.undo(); // 执行undo操作，命令被移到redo栈
stack.redo(); // 执行redo操作，命令再次被移到undo栈