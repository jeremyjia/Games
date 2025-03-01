class NavigationMenu {
    constructor(menuData) {
        this.menuData = menuData;
        this.initStyles();
        this.createMenu();
    }

    initStyles() {
        if (!document.querySelector('#nav-menu-styles')) {
            const style = document.createElement('style');
            style.id = 'nav-menu-styles';
            style.textContent = `
                .nav-menu {
                    background: #333;
                    padding: 0 20px;
                    font-family: Arial, sans-serif;
                }

                .nav-menu > ul {
                    display: flex;
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }

                .menu-item {
                    position: relative;
                }

                .menu-item > a {
                    display: block;
                    color: white;
                    padding: 15px 20px;
                    text-decoration: none;
                    transition: background 0.3s;
                }

                .menu-item > a:hover {
                    background: #555;
                }

                .submenu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background: #444;
                    min-width: 200px;
                    padding: 0;
                    list-style: none;
                    box-shadow: 0 3px 5px rgba(0,0,0,0.2);
                    z-index: 1000;
                }

                .submenu.active {
                    display: block;
                }

                .submenu .submenu {
                    top: 0;
                    left: 100%;
                }

                .submenu-item > a {
                    padding: 12px 20px;
                    color: #ddd;
                    display: block;
                    border-bottom: 1px solid #555;
                }

                .submenu-item > a:hover {
                    background: #666;
                }

                .has-submenu::after {
                    content: "›";
                    margin-left: 8px;
                    display: inline-block;
                    transform: rotate(90deg);
                }
            `;
            document.head.appendChild(style);
        }
    }

    createMenu() {
        const nav = document.createElement('nav');
        nav.className = 'nav-menu';
        
        const menuUl = document.createElement('ul');
        this.menuData.forEach(item => {
            menuUl.appendChild(this.createMenuItem(item));
        });

        nav.appendChild(menuUl);
        document.body.prepend(nav);
    }

    createMenuItem(itemData) {
        const li = document.createElement('li');
        li.className = 'menu-item';
        
        const a = document.createElement('a');
        a.href = itemData.url || '#';
        a.textContent = itemData.text;
        
        if (itemData.submenu) {
            li.classList.add('has-submenu');
            const submenu = this.createSubmenu(itemData.submenu);
            li.append(a, submenu);
            
            // 阻止默认点击行为
            a.addEventListener('click', (e) => e.preventDefault());
            
            let timeoutId;
            
            // 鼠标进入显示子菜单
            li.addEventListener('mouseenter', () => {
                clearTimeout(timeoutId);
                submenu.classList.add('active');
                this.closeOtherSubmenus(submenu);
            });
            
            // 鼠标离开延迟隐藏
            li.addEventListener('mouseleave', () => {
                timeoutId = setTimeout(() => {
                    submenu.classList.remove('active');
                }, 300);
            });
            
            // 子菜单交互
            submenu.addEventListener('mouseenter', () => clearTimeout(timeoutId));
            submenu.addEventListener('mouseleave', () => {
                timeoutId = setTimeout(() => {
                    submenu.classList.remove('active');
                }, 300);
            });
        } else {
            li.appendChild(a);
        }

        return li;
    }

    createSubmenu(submenuData) {
        const ul = document.createElement('ul');
        ul.className = 'submenu';
        
        submenuData.forEach(item => {
            const li = document.createElement('li');
            li.className = 'submenu-item';
            
            const a = document.createElement('a');
            a.href = item.url || '#';
            a.textContent = item.text;
            
            if (item.submenu) {
                li.classList.add('has-submenu');
                const subSubmenu = this.createSubmenu(item.submenu);
                li.append(a, subSubmenu);
                
                // 阻止默认点击行为
                a.addEventListener('click', (e) => e.preventDefault());
                
                let subTimeout;
                
                // 鼠标进入显示子菜单
                li.addEventListener('mouseenter', () => {
                    clearTimeout(subTimeout);
                    subSubmenu.classList.add('active');
                    this.closeOtherSubmenus(subSubmenu);
                });
                
                // 鼠标离开延迟隐藏
                li.addEventListener('mouseleave', () => {
                    subTimeout = setTimeout(() => {
                        subSubmenu.classList.remove('active');
                    }, 300);
                });
                
                // 子菜单交互
                subSubmenu.addEventListener('mouseenter', () => clearTimeout(subTimeout));
                subSubmenu.addEventListener('mouseleave', () => {
                    subTimeout = setTimeout(() => {
                        subSubmenu.classList.remove('active');
                    }, 300);
                });
            } else {
                li.appendChild(a);
            }
            
            ul.appendChild(li);
        });

        return ul;
    }

    closeOtherSubmenus(currentSubmenu) {
        const parentMenu = currentSubmenu.parentElement.closest('ul');
        if (parentMenu) {
            parentMenu.querySelectorAll('.submenu').forEach(menu => {
                if (menu !== currentSubmenu) menu.classList.remove('active');
            });
        } else {
            document.querySelectorAll('.nav-menu > ul > .menu-item > .submenu').forEach(menu => {
                if (menu !== currentSubmenu) menu.classList.remove('active');
            });
        }
    }
}
 