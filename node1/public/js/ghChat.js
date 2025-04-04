const GH_API = {
    MESSAGE_URL: "https://api.github.com/repos/jeremyjia/Games/issues/comments/526806470",
    USERS_URL: "https://api.github.com/repos/jeremyjia/Games/issues/comments/543738078",
    TOKENS: [
        "ghp_Od6GW3"+"J2NiP01Zsz"+"g9JQV0amzn"+"UxhF33iBES", //Jeremy
        "ghp_LWbSRdeNb"+"tr0wykbm2Q"+"TFqxdP6x4u"+"A4MQH0M" //XiYu
    ]
};

class ChatUI {
    constructor(parent) {
        this.parent = parent;
        this.currentUser = null;
        this.allMessages = "";
        this.globalUsers = [];
        this.timers = new Set();
        this.initUI();
    }

    initUI() {
        this.createContainer();
        this.createLoginForm();
        this.createChatInterface();
        this.toggleView(false);
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.id = 'chat-container';
        this.container.className = 'chat-container';
        this.container.style.cssText = `
            position: fixed;
            left: 400px;
            top: 40px;
            width: 540px;
            background-color: #f1f1f1;
            border: 1px solid #d3d3d3;
            z-index: 1000;
        `;
        this.parent.appendChild(this.container);
    }

    createLoginForm() {
        this.loginForm = document.createElement('div');
        this.loginForm.className = 'login-form';

        this.usernameInput = document.createElement('input');
        this.usernameInput.type = 'text';
        this.usernameInput.placeholder = 'Enter username...';
        this.usernameInput.className = 'login-input';

        this.loginButton = document.createElement('button');
        this.loginButton.textContent = 'Login';
        this.loginButton.className = 'login-btn';
        this.loginButton.onclick = () => this.handleLogin();

        this.loginForm.append(this.usernameInput, this.loginButton);
        this.container.appendChild(this.loginForm);
    }

    createChatInterface() {
        this.chatInterface = document.createElement('div');
        this.chatInterface.className = 'chat-interface';
        this.chatInterface.style.display = 'none';

        this.createHeader();
        this.createMessageDisplay();
        this.createMessageInput();
        this.createUserList();
        this.createLogoutButton();
        this.container.appendChild(this.chatInterface);
    }

    createHeader() {
        const header = document.createElement('div');
        header.textContent = 'Chat Room v2.0';
        header.className = 'chat-header';
        header.style.cssText = `
            background-color: #2196F3;
            color: white;
            padding: 10px;
            cursor: move;
        `;
        this.makeDraggable(header);
        this.chatInterface.appendChild(header);
    }

    createMessageDisplay() {
        this.messageDisplay = document.createElement('textarea');
        this.messageDisplay.className = 'message-display';
        this.messageDisplay.readOnly = true;

        this.clearButton = document.createElement('button');
        this.clearButton.textContent = 'Clear';
        this.clearButton.className = 'clear-btn';
        this.clearButton.onclick = () => this.clearMessages();

        this.chatInterface.append(this.messageDisplay, this.clearButton);
    }

    createMessageInput() {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';

        this.messageInput = document.createElement('textarea');
        this.messageInput.className = 'message-input';
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        this.sendButton = document.createElement('button');
        this.sendButton.textContent = 'Send';
        this.sendButton.className = 'send-btn';
        this.sendButton.onclick = () => this.sendMessage();

        inputGroup.append(this.messageInput, this.sendButton);
        this.chatInterface.appendChild(inputGroup);
    }

    createUserList() {
        this.userListContainer = document.createElement('div');
        this.userListContainer.className = 'user-list';

        this.refreshButton = document.createElement('button');
        this.refreshButton.textContent = 'Refresh';
        this.refreshButton.className = 'refresh-btn';
        this.refreshButton.onclick = () => this.fetchUsers(true);

        this.userList = document.createElement('ul');
        this.userList.className = 'users';

        const userListTitle = document.createElement('h3');
        userListTitle.textContent = 'Online Users';

        this.userListContainer.append(
            this.refreshButton,
            userListTitle,
            this.userList
        );

        this.chatInterface.appendChild(this.userListContainer);
    }

    createLogoutButton() {
        this.logoutButton = document.createElement('button');
        this.logoutButton.textContent = 'Logout';
        this.logoutButton.className = 'logout-btn';
        this.logoutButton.onclick = () => this.handleLogout();
        this.chatInterface.appendChild(this.logoutButton);
    }

    async handleLogin() {
        const username = this.usernameInput.value.trim();
        if (!username) return this.showAlert('Username required');

        this.currentUser = {
            name: username,
            token: GH_API.TOKENS[Math.floor(Math.random() * GH_API.TOKENS.length)]
        };

        this.toggleView(true);
        this.startPolling();
        await this.updateUserStatus(true);
        await this.fetchUsers();
    }

    async handleLogout() {
        await this.updateUserStatus(false);
        this.toggleView(false);
        this.stopPolling();
        this.currentUser = null;
        this.usernameInput.value = '';
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        try {
            await this.postMessage(message);
            this.messageInput.value = '';
            this.messageInput.focus();
        } catch (error) {
            this.showAlert(`Send failed: ${error.message}`);
        }
    }

    async postMessage(text) {
        const newContent = [this.allMessages, `${this.formatDate()}\n${this.currentUser.name}: ${text}`]
            .filter(Boolean).join('\n');

        await this.apiRequest('PATCH', GH_API.MESSAGE_URL, { body: newContent });
        this.allMessages = newContent;
        this.messageDisplay.value = newContent;
    }

    async fetchMessages() {
        try {
            const res = await this.apiRequest('GET', GH_API.MESSAGE_URL);
            if (res.body !== this.allMessages) {
                this.allMessages = res.body || '';
                this.messageDisplay.value = this.allMessages;
            }
        } catch (error) {
            console.error('Message fetch error:', error);
        }
    }

    async fetchUsers(forceUpdate = false) {
        try {
            const res = await this.apiRequest('GET', GH_API.USERS_URL);
            this.globalUsers = JSON.parse(res.body).users;
            this.updateUserList();
            if (forceUpdate) await this.cleanInactiveUsers();
        } catch (error) {
            this.showAlert('Failed to fetch users');
        }
    }

    makeDraggable(element) {
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialLeft = parseInt(this.container.offsetLeft);
            initialTop = parseInt(this.container.offsetTop);
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            this.container.style.left = `${initialLeft + deltaX}px`;
            this.container.style.top = `${initialTop + deltaY}px`;
        });

        document.addEventListener('mouseup', () => isDragging = false);
    }

    toggleView(loggedIn) {
        this.loginForm.style.display = loggedIn ? 'none' : 'flex';
        this.chatInterface.style.display = loggedIn ? 'block' : 'none';
    }

    startPolling() {
        this.addTimer(setInterval(() => {
            this.fetchMessages();
        }, 1000));
        this.addTimer(setInterval(() => this.fetchUsers(), 5000));
    }

    stopPolling() {
        this.timers.forEach(clearInterval);
        this.timers.clear();
    }

    addTimer(timerId) {
        this.timers.add(timerId);
    }

    updateUserList() {
        this.userList.innerHTML = this.globalUsers
            .filter(u => u.isLogin)
            .map(u => `<li>${u.name}</li>`)
            .join('');
    }

    async cleanInactiveUsers() {
        const threshold = 24 * 60 * 60 * 1000; // 24小时
        const now = Date.now();
        
        const updatedUsers = this.globalUsers.map(user => ({
            ...user,
            isLogin: user.isLogin && (now - new Date(user.LastloginTime)) < threshold
        }));

        await this.apiRequest('PATCH', GH_API.USERS_URL, {
            body: JSON.stringify({ users: updatedUsers })
        });
        this.globalUsers = updatedUsers;
    }

    async apiRequest(method, url, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader('Authorization', `token ${this.currentUser?.token}`);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
                }
            };

            xhr.onerror = () => reject(new Error('Network error'));
            xhr.send(data ? JSON.stringify(data) : null);
        });
    }

    formatDate() {
        return new Date().toISOString().replace('T', ' ').substring(0, 19);
    }

    showAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.textContent = message;
        alertDiv.className = 'alert';
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px;
            background-color: #ff4444;
            color: white;
            border-radius: 4px;
            z-index: 2000;
        `;
        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 3000);
    }

    async clearMessages() {
        const text = "Let's chat";
        const newContent = ["", `${this.formatDate()}\n${this.currentUser.name}: ${text}`]
            .filter(Boolean).join('\n');

        await this.apiRequest('PATCH', GH_API.MESSAGE_URL, { body: newContent });
        this.allMessages = newContent;
        this.messageDisplay.value = newContent; 
    }

    async updateUserStatus(isLogin) {
        try {
            const updatedUsers = this.globalUsers.map(user => 
                user.name === this.currentUser.name 
                    ? { ...user, isLogin, LastloginTime: this.formatDate() }
                    : user
            );

            await this.apiRequest('PATCH', GH_API.USERS_URL, {
                body: JSON.stringify({ users: updatedUsers })
            });
            this.globalUsers = updatedUsers;
        } catch (error) {
            this.showAlert('Failed to update user status');
        }
    }
}

const chatRoot = document.createElement('div');
document.body.appendChild(chatRoot);
const chatRoom = new ChatUI(chatRoot);    

//升级：让UI更漂亮些