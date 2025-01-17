class BlogApp {
    constructor() {
        this.allArticles = [
            {
                id: 1,
                title: "The Future of Web Development",
                author: {
                    name: "John Doe",
                    image: "https://i.pravatar.cc/150?img=1"
                },
                preview: "Exploring the latest trends in web development, from WebAssembly to Edge Computing...",
                category: "Technology",
                readTime: "5 min read",
                likes: 234,
                date: "2024-01-15",
                featured: true
            },
            {
                id: 2,
                title: "Mastering Modern JavaScript",
                author: {
                    name: "Jane Smith",
                    image: "https://i.pravatar.cc/150?img=2"
                },
                preview: "Deep dive into advanced JavaScript concepts, ES6+ features, and best practices...",
                category: "Programming",
                readTime: "8 min read",
                likes: 156,
                date: "2024-01-14",
                featured: true
            },
            {
                id: 3,
                title: "UI/UX Design Principles",
                author: {
                    name: "Alex Johnson",
                    image: "https://i.pravatar.cc/150?img=3"
                },
                preview: "Essential principles of user interface and experience design for modern applications...",
                category: "Design",
                readTime: "6 min read",
                likes: 189,
                date: "2024-01-13",
                featured: false
            },
            {
                id: 4,
                title: "Machine Learning Basics",
                author: {
                    name: "Sarah Wilson",
                    image: "https://i.pravatar.cc/150?img=4"
                },
                preview: "Introduction to machine learning concepts, algorithms, and practical applications...",
                category: "AI",
                readTime: "10 min read",
                likes: 312,
                date: "2024-01-12",
                featured: true
            },
            {
                id: 5,
                title: "Mobile App Development Trends",
                author: {
                    name: "Mike Chen",
                    image: "https://i.pravatar.cc/150?img=5"
                },
                preview: "Latest trends and technologies in mobile app development for iOS and Android...",
                category: "Mobile",
                readTime: "7 min read",
                likes: 145,
                date: "2024-01-11",
                featured: false
            },
            {
                id: 6,
                title: "Cloud Computing Essentials",
                author: {
                    name: "Emily Brown",
                    image: "https://i.pravatar.cc/150?img=6"
                },
                preview: "Understanding cloud services, architecture, and deployment strategies...",
                category: "Cloud",
                readTime: "9 min read",
                likes: 278,
                date: "2024-01-10",
                featured: true
            },
            {
                id: 7,
                title: "Cybersecurity Best Practices",
                author: {
                    name: "David Lee",
                    image: "https://i.pravatar.cc/150?img=7"
                },
                preview: "Essential security practices for protecting applications and data...",
                category: "Security",
                readTime: "8 min read",
                likes: 423,
                date: "2024-01-09",
                featured: false
            },
            {
                id: 8,
                title: "DevOps Pipeline Setup",
                author: {
                    name: "Rachel Green",
                    image: "https://i.pravatar.cc/150?img=8"
                },
                preview: "Step-by-step guide to setting up a modern DevOps pipeline...",
                category: "DevOps",
                readTime: "12 min read",
                likes: 167,
                date: "2024-01-08",
                featured: true
            },
            {
                id: 9,
                title: "Blockchain Development",
                author: {
                    name: "Tom Wilson",
                    image: "https://i.pravatar.cc/150?img=9"
                },
                preview: "Introduction to blockchain development and smart contracts...",
                category: "Blockchain",
                readTime: "11 min read",
                likes: 289,
                date: "2024-01-07",
                featured: false
            },
            {
                id: 10,
                title: "Data Science with Python",
                author: {
                    name: "Lisa Anderson",
                    image: "https://i.pravatar.cc/150?img=10"
                },
                preview: "Practical guide to data analysis and visualization using Python...",
                category: "Data Science",
                readTime: "9 min read",
                likes: 345,
                date: "2024-01-06",
                featured: true
            }
        ];
        
        this.currentTab = 'featured';
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.renderArticles(this.getArticlesBySection('featured'));
        this.loadAuthors();
        
        // Rotate articles every 5 minutes
        setInterval(() => {
            this.renderArticles(this.getArticlesBySection(this.currentTab));
        }, 300000); // 5 minutes
    }

    setupEventListeners() {
        // Ensure DOM is ready before adding event listeners
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.addEventListeners());
        } else {
            this.addEventListeners();
        }
    }

    addEventListeners() {
        // Move all event listener setup here
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Write button
        document.querySelector('.write-btn').addEventListener('click', () => {
            document.querySelector('.write-modal').classList.remove('hidden');
        });

        // Close modal
        document.querySelector('.close-modal').addEventListener('click', () => {
            document.querySelector('.write-modal').classList.add('hidden');
        });

        // Profile menu
        document.querySelector('.profile-img').addEventListener('click', () => {
            document.querySelector('.dropdown-menu').classList.toggle('hidden');
        });

        // Search functionality
        document.getElementById('search').addEventListener('input', (e) => {
            this.searchArticles(e.target.value);
        });

        // Publish button
        document.querySelector('.publish').addEventListener('click', () => {
            this.publishArticle();
        });

        // Editor toolbar functionality
        document.querySelectorAll('.editor-toolbar button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const command = button.dataset.command;
                this.formatText(command);
                
                // Toggle active state for bold and italic
                if (command === 'bold' || command === 'italic') {
                    button.classList.toggle('active');
                }
            });
        });

        // Profile icon click handler
        const profileIcon = document.getElementById('profileIcon');
        if (profileIcon) {
            profileIcon.addEventListener('click', (e) => {
                const dropdown = document.querySelector('.auth-dropdown');
                dropdown.classList.toggle('hidden');
                e.stopPropagation();
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.auth-dropdown') && !e.target.closest('.profile-icon')) {
                const dropdown = document.querySelector('.auth-dropdown');
                if (dropdown) {
                    dropdown.classList.add('hidden');
                }
            }
        });

        // Social auth buttons
        document.querySelectorAll('.auth-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = btn.classList.contains('google') ? 'Google' :
                               btn.classList.contains('github') ? 'GitHub' :
                               btn.classList.contains('facebook') ? 'Facebook' : 'Email';
                
                // Here you would implement actual authentication
                console.log(`Authenticating with ${provider}...`);
            });
        });

        // Email form submission
        document.querySelector('.email-auth').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input').value;
            if (email) {
                // Here you would implement actual email authentication
                console.log(`Authenticating with email: ${email}`);
            }
        });

        // Hamburger menu functionality
        const menuButton = document.getElementById('menuButton');
        const menuDropdown = document.querySelector('.menu-dropdown');
        
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);

        if (menuButton && menuDropdown) {
            menuButton.addEventListener('click', (e) => {
                e.stopPropagation();
                menuButton.classList.toggle('active');
                menuDropdown.classList.toggle('show');
                overlay.classList.toggle('show');
                document.body.style.overflow = menuDropdown.classList.contains('show') ? 'hidden' : '';
            });

            // Close menu when clicking overlay
            overlay.addEventListener('click', () => {
                menuButton.classList.remove('active');
                menuDropdown.classList.remove('show');
                overlay.classList.remove('show');
                document.body.style.overflow = '';
            });

            // Close menu when pressing Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && menuDropdown.classList.contains('show')) {
                    menuButton.classList.remove('active');
                    menuDropdown.classList.remove('show');
                    overlay.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });

            // Handle menu item clicks
            menuDropdown.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    menuButton.classList.remove('active');
                    menuDropdown.classList.remove('show');
                    overlay.classList.remove('show');
                    document.body.style.overflow = '';
                });
            });
        }

        // Add live preview update
        const textarea = document.getElementById('post-content');
        if (textarea) {
            textarea.addEventListener('input', () => this.updatePreview());
        }
    }

    renderArticles(articles = this.articles) {
        const container = document.querySelector('.articles-container');
        if (!container) return;

        container.innerHTML = articles.map(article => `
            <article class="article-card">
                <div class="article-image-container">
                    <img src="${this.getRandomImage(article.category)}" alt="${article.title}" class="article-image">
                </div>
                <div class="article-content">
                    <div class="article-meta">
                        <div class="author-info">
                            <img src="${article.author.image}" alt="${article.author.name}">
                            <div class="author-details">
                                <span class="author-name">${article.author.name}</span>
                                <span class="article-date">${this.formatDate(article.date)}</span>
                            </div>
                        </div>
                    </div>
                    <h2 class="article-title">${article.title}</h2>
                    <p class="article-preview">${article.preview}</p>
                    <div class="article-footer">
                        <div class="article-tags">
                            <span class="tag">${article.category}</span>
                            <span class="tag">${article.readTime}</span>
                        </div>
                        <div class="article-actions">
                            <button class="action-btn like-btn" data-id="${article.id}">
                                <i class="far fa-heart"></i>
                                <span class="likes-count">${article.likes}</span>
                            </button>
                            <button class="action-btn save-btn">
                                <i class="far fa-bookmark"></i>
                            </button>
                            <a href="/blog/${article.id}" class="read-more-btn">Read More</a>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');

        this.setupArticleActions();
    }

    setupArticleActions() {
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const articleId = btn.dataset.id;
                this.likeArticle(articleId);
            });
        });

        document.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.currentTarget;
                button.querySelector('i').classList.toggle('fas');
                button.querySelector('i').classList.toggle('far');
            });
        });
    }

    loadAuthors() {
        const authors = [
            {
                name: "Jane Smith",
                bio: "Tech writer & developer",
                image: "https://via.placeholder.com/50",
                followers: 1234
            },
            // Add more authors...
        ];

        const container = document.querySelector('.authors-list');
        container.innerHTML = authors.map(author => `
            <div class="author-card">
                <img src="${author.image}" alt="${author.name}">
                <div class="author-info">
                    <h4>${author.name}</h4>
                    <p>${author.bio}</p>
                </div>
                <button class="follow-btn">Follow</button>
            </div>
        `).join('');
    }

    switchTab(tab) {
        this.currentTab = tab;
        document.querySelectorAll('.tab').forEach(t => {
            t.classList.toggle('active', t.dataset.tab === tab);
        });
        this.renderArticles(this.getArticlesBySection(tab));
    }

    searchArticles(query) {
        if (!query) {
            this.renderArticles(this.getArticlesBySection(this.currentTab));
            return;
        }

        const filtered = this.allArticles.filter(article => 
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.preview.toLowerCase().includes(query.toLowerCase()) ||
            article.category.toLowerCase().includes(query.toLowerCase())
        );
        this.renderArticles(filtered);
    }

    formatText(command) {
        const textarea = document.getElementById('post-content');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        let formattedText = '';
        let prefix = '';
        let suffix = '';

        // Check if the selected text is already formatted
        const textBeforeSelection = textarea.value.substring(0, start);
        const textAfterSelection = textarea.value.substring(end);
        const isAlreadyFormatted = {
            bold: /\*\*[^*]*\*\*$/.test(textBeforeSelection) && /^[^*]*\*\*/.test(textAfterSelection),
            italic: /\*[^*]*\*$/.test(textBeforeSelection) && /^[^*]*\*/.test(textAfterSelection),
        };

        switch(command) {
            case 'bold':
                if (isAlreadyFormatted.bold) {
                    // Remove bold formatting
                    const boldStart = textBeforeSelection.lastIndexOf('**');
                    const boldEnd = textAfterSelection.indexOf('**') + 2;
                    textarea.value = 
                        textBeforeSelection.substring(0, boldStart) +
                        selectedText +
                        textAfterSelection.substring(boldEnd);
                    textarea.selectionStart = start - 2;
                    textarea.selectionEnd = end - 2;
                } else {
                    // Add bold formatting
                    prefix = suffix = '**';
                    formattedText = `${prefix}${selectedText}${suffix}`;
                    textarea.value = 
                        textarea.value.substring(0, start) +
                        formattedText +
                        textarea.value.substring(end);
                    textarea.selectionStart = start + 2;
                    textarea.selectionEnd = end + 2;
                }
                break;

            case 'italic':
                if (isAlreadyFormatted.italic) {
                    // Remove italic formatting
                    const italicStart = textBeforeSelection.lastIndexOf('*');
                    const italicEnd = textAfterSelection.indexOf('*') + 1;
                    textarea.value = 
                        textBeforeSelection.substring(0, italicStart) +
                        selectedText +
                        textAfterSelection.substring(italicEnd);
                    textarea.selectionStart = start - 1;
                    textarea.selectionEnd = end - 1;
                } else {
                    // Add italic formatting
                    prefix = suffix = '*';
                    formattedText = `${prefix}${selectedText}${suffix}`;
                    textarea.value = 
                        textarea.value.substring(0, start) +
                        formattedText +
                        textarea.value.substring(end);
                    textarea.selectionStart = start + 1;
                    textarea.selectionEnd = end + 1;
                }
                break;

            case 'link':
                formattedText = `[${selectedText}](url)`;
                textarea.value = 
                    textarea.value.substring(0, start) +
                    formattedText +
                    textarea.value.substring(end);
                break;

            case 'image':
                formattedText = `![${selectedText}](image-url)`;
                textarea.value = 
                    textarea.value.substring(0, start) +
                    formattedText +
                    textarea.value.substring(end);
                break;
        }

        // Update preview if it exists
        this.updatePreview();
    }

    updatePreview() {
        const content = document.getElementById('post-content').value;
        const previewArea = document.getElementById('preview-area');
        
        if (previewArea) {
            // Convert markdown-style formatting to HTML
            let htmlContent = content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
                .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>') // Links
                .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">') // Images
                .replace(/\n/g, '<br>'); // Line breaks

            previewArea.innerHTML = htmlContent;
        }
    }

    publishArticle() {
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const category = document.getElementById('post-category').value;
        const tags = document.getElementById('post-tags').value;

        if (!title || !content || !category) {
            alert('Please fill in all required fields');
            return;
        }

        // In a real app, would send to server
        const newArticle = {
            id: this.articles.length + 1,
            title,
            author: {
                name: "Current User",
                image: "https://via.placeholder.com/30"
            },
            preview: content.substring(0, 150) + "...",
            category,
            readTime: `${Math.ceil(content.split(' ').length / 200)} min read`,
            likes: 0,
            date: new Date().toISOString().split('T')[0]
        };

        this.articles.unshift(newArticle);
        this.renderArticles();
        document.querySelector('.write-modal').classList.add('hidden');
        
        // Clear form
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
        document.getElementById('post-category').value = '';
        document.getElementById('post-tags').value = '';
    }

    likeArticle(articleId) {
        const article = this.articles.find(a => a.id === parseInt(articleId));
        if (article) {
            article.likes++;
            // Update only the like count and button state
            const likeBtn = document.querySelector(`.like-btn[data-id="${articleId}"]`);
            if (likeBtn) {
                likeBtn.classList.add('liked');
                likeBtn.querySelector('.likes-count').textContent = article.likes;
                
                // Remove the liked class after animation completes
                setTimeout(() => {
                    likeBtn.classList.remove('liked');
                }, 500);
            }
        }
    }

    getRandomImage(category) {
        const categoryImages = this.getCategoryImages();
        const images = categoryImages[category] || [
            // Default images if category not found
            'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
            'https://images.unsplash.com/photo-1432821596592-e2c18b78144f',
            'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3'
        ];
        
        return `${images[Math.floor(Math.random() * images.length)]}?auto=format&fit=crop&w=800&q=80`;
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    initializeDarkMode() {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
        }
    }

    getArticlesBySection(section) {
        let articles = [];
        switch(section) {
            case 'featured':
                articles = this.allArticles.filter(article => article.featured);
                break;
            case 'recent':
                articles = [...this.allArticles].sort((a, b) => 
                    new Date(b.date) - new Date(a.date)
                );
                break;
            case 'following':
                // Randomly select some articles to simulate followed authors
                articles = this.shuffleArray([...this.allArticles]).slice(0, 5);
                break;
            default:
                articles = this.allArticles;
        }
        return this.shuffleArray(articles).slice(0, 6); // Show max 6 articles per section
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    getCategoryImages() {
        return {
            'Technology': [
                'https://images.unsplash.com/photo-1518770660439-4636190af475',
                'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
                'https://images.unsplash.com/photo-1451187580459-43490279c0fa'
            ],
            'Programming': [
                'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                'https://images.unsplash.com/photo-1516116216624-53e697fedbea'
            ],
            'Design': [
                'https://images.unsplash.com/photo-1561070791-2526d30994b5',
                'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e',
                'https://images.unsplash.com/photo-1613979813687-1cad02a99a8e'
            ],
            'AI': [
                'https://images.unsplash.com/photo-1677442136019-21780ecad995',
                'https://images.unsplash.com/photo-1676277791608-ac54525aa2ed',
                'https://images.unsplash.com/photo-1677442136019-21780ecad995'
            ],
            'Mobile': [
                'https://images.unsplash.com/photo-1551650975-87deedd944c3',
                'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c',
                'https://images.unsplash.com/photo-1585399000684-d2f72660f092'
            ],
            'Cloud': [
                'https://images.unsplash.com/photo-1544197150-b99a580bb7a8',
                'https://images.unsplash.com/photo-1603695762547-fba8b88ac8ad',
                'https://images.unsplash.com/photo-1601790656359-fd5e40d3e1d7'
            ],
            'Security': [
                'https://images.unsplash.com/photo-1614064641938-3bbee52942c7',
                'https://images.unsplash.com/photo-1563986768609-322da13575f3',
                'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb'
            ],
            'DevOps': [
                'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb',
                'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9',
                'https://images.unsplash.com/photo-1607743386760-88ac62b89b8a'
            ],
            'Blockchain': [
                'https://images.unsplash.com/photo-1639762681485-074b7f938ba0',
                'https://images.unsplash.com/photo-1642784353782-ac4aa5a9c0c4',
                'https://images.unsplash.com/photo-1644143379190-08a5f055de1d'
            ],
            'Data Science': [
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
                'https://images.unsplash.com/photo-1518186285589-2f7649de83e0',
                'https://images.unsplash.com/photo-1527474305487-b87b222841cc'
            ]
        };
    }
}

// Initialize the app
const app = new BlogApp(); 