 
const ChatRoom = (() => {
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
            this.container = this.createElement('div', {
                id: 'chat-container',
                classes: ['chat-container'],
                styles: {
                    position: 'fixed',
                    left: '400px',
                    top: '40px',
                    width: '540px',
                    backgroundColor: '#f1f1f1',
                    border: '1px solid #d3d3d3',
                    zIndex: 1000
                }
            });
            this.parent.appendChild(this.container);
        }

        createLoginForm() {
            this.loginForm = this.createElement('div', { classes: ['login-form'] });
            
            this.usernameInput = this.createElement('input', {
                type: 'text',
                placeholder: 'Enter username...',
                classes: ['login-input']
            });

            this.loginButton = this.createElement('button', {
                text: 'Login',
                classes: ['login-btn'],
                events: {
                    click: () => this.handleLogin()
                }
            });

            this.loginForm.append(this.usernameInput, this.loginButton);
            this.container.appendChild(this.loginForm);
        }

        createChatInterface() {
            this.chatInterface = this.createElement('div', { 
                classes: ['chat-interface'],
                styles: { display: 'none' }
            });

            this.createHeader();
            this.createMessageDisplay();
            this.createMessageDisplay();
            this.createMessageInput();
            this.createUserList();
            this.container.appendChild(this.chatInterface);
        }

        createHeader() {
            const header = this.createElement('div', {
                text: 'Chat Room v2.0',
                classes: ['chat-header'],
                styles: {
                    backgroundColor: '#2196F3',
                    color: 'white',
                    padding: '10px',
                    cursor: 'move'
                }
            });

            this.makeDraggable(header);
            this.chatInterface.appendChild(header);
        }

        createMessageDisplay() {
            this.messageDisplay = this.createElement('textarea', {
                classes: ['message-display'],
                attributes: { readonly: true }
            });

            this.clearButton = this.createElement('button', {
                text: 'Clear',
                classes: ['clear-btn'],
                events: {
                    click: () => this.clearMessages()
                }
            });

            this.chatInterface.append(this.messageDisplay, this.clearButton);
        }

        createMessageInput() {
            const inputGroup = this.createElement('div', { classes: ['input-group'] });
            
            this.messageInput = this.createElement('textarea', {
                classes: ['message-input'],
                events: {
                    keypress: (e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            this.sendMessage();
                        }
                    }
                }
            });

            this.sendButton = this.createElement('button', {
                text: 'Send',
                classes: ['send-btn'],
                events: {
                    click: () => this.sendMessage()
                }
            });

            inputGroup.append(this.messageInput, this.sendButton);
            this.chatInterface.appendChild(inputGroup);
        }

        createUserList() {
            this.userListContainer = this.createElement('div', { classes: ['user-list'] });
            
            this.refreshButton = this.createElement('button', {
                text: 'Refresh',
                classes: ['refresh-btn'],
                events: {
                    click: () => this.fetchUsers(true)
                }
            });

            this.userList = this.createElement('ul', { classes: ['users'] });
            
            this.userListContainer.append(
                this.refreshButton,
                this.createElement('h3', { text: 'Online Users' }),
                this.userList
            );

            this.chatInterface.appendChild(this.userListContainer);
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

        createElement(tag, config = {}) {
            const el = document.createElement(tag);
            
            Object.entries(config).forEach(([key, value]) => {
                switch (key) {
                    case 'text':
                        el.textContent = value;
                        break;
                    case 'classes':
                        el.classList.add(...value);
                        break;
                    case 'styles':
                        Object.assign(el.style, value);
                        break;
                    case 'events':
                        Object.entries(value).forEach(([type, handler]) => 
                            el.addEventListener(type, handler));
                        break;
                    case 'attributes':
                        Object.entries(value).forEach(([name, val]) => 
                            el.setAttribute(name, val));
                        break;
                }
            });
            return el;
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
            this.addTimer(setInterval(() => this.fetchMessages(), 1000));
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
            const alert = this.createElement('div', {
                text: message,
                classes: ['alert'],
                styles: {
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    padding: '10px',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    borderRadius: '4px'
                }
            });

            document.body.appendChild(alert);
            setTimeout(() => alert.remove(), 3000);
        }

        clearMessages() {
            this.allMessages = '';
            this.messageDisplay.value = '';
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

    return {
        init: (parent) => new ChatUI(parent)
    };
})();

const chatRoot = document.createElement('div');
document.body.appendChild(chatRoot);
const chatRoom = ChatRoom.init(chatRoot);