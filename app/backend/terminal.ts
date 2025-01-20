interface FileSystemNode {
    name: string;
    type: "file" | "directory";
    content?: string;
    children?: { [key: string]: FileSystemNode };
}

export class OSFileSystem {
    private root: FileSystemNode;
    private storageKey = 'FileSystem';
    public currentDir: string[];

    constructor() {
        this.root = this.loadFromStorage() || this.createDefaultFS();
        this.currentDir = ["root", "home", "user"];
    }

    // commands
    public cd_command(path: string | null): string {
        if (!path) {
            this.currentDir = ["root", "home", "user"];
            return "Navigated to home directory.";
        }
    
        const nodes: string[] = path.split("/");
        const initialDir = [...this.currentDir];
    
        for (const node of nodes) {
            if (node === "..") {
                if (this.currentDir.length > 1) {
                    this.currentDir.pop();
                } else {
                    return "Already at the root directory.";
                }
            } else if (node === ".") {
                continue;
            } else {
                const currentNode = this.findNodeByName(this.root, this.currentDir[this.currentDir.length - 1]);
                if (
                    currentNode &&
                    currentNode.type === "directory" &&
                    currentNode.children &&
                    currentNode.children[node]
                ) {
                    this.currentDir.push(node);
                } else {
                    this.currentDir = initialDir; // Revert changes
                    return `Directory not found: ${node}`;
                }
            }
        }
    
        return `Navigated to: /${this.currentDir.join("/")}`;
    }

    private findNodeByName(node: FileSystemNode, name: string): FileSystemNode | null {
        if (node.name === name) {
            return node;
        }
    
        if (node.children) {
            for (const key in node.children) {
                const child = node.children[key];
                const result = this.findNodeByName(child, name);
                if (result) {
                    return result;
                }
            }
        }
    
        return null;
    }

    public ls_command(path: string | null): string {
        let currentDirs: string[] = [...this.currentDir];
        let targetNode: FileSystemNode | null = this.findNodeByName(this.root, currentDirs[currentDirs.length - 1]);
    
        if (path) {
            const nodes: string[] = path.split("/");
    
            for (const node of nodes) {
                if (node === "..") {
                    if (currentDirs.length > 1) {
                        currentDirs.pop();
                        targetNode = this.findNodeByName(this.root, currentDirs[currentDirs.length - 1]);
                    } else {
                        return "Already at the root directory.";
                    }
                } else if (node === ".") {
                    continue;
                } else {
                    targetNode = this.findNodeByName(targetNode!, node);
                    if (!targetNode || targetNode.type !== "directory") {
                        return `Directory not found: ${node}`;
                    }
                    currentDirs.push(node);
                }
            }
        }
    
        if (targetNode && targetNode.type === "directory" && targetNode.children) {
            const nodeList = Object.keys(targetNode.children).join("  ");
            return nodeList || "(empty directory)";
        }
    
        return "No such directory.";
    }

    public loadFromStorage(): FileSystemNode | null {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : null;
    }

    private saveToStorage(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.root));
    }

    private createDefaultFS(): FileSystemNode {
        return {
            name: "root",
            type: "directory",
            children: {
                home: {
                    name: "home",
                    type: "directory",
                    children: {
                        user: {
                            name: "user",
                            type: "directory",
                            children: {
                                ukoly: {
                                    name: "ukoly",
                                    type: "directory",
                                    children: {
                                        testdir: {
                                            name: "testdir",
                                            type: "directory",
                                            children: {}
                                        }
                                    }
                                },
                                desktop: {
                                    name: "desktop",
                                    type: "directory",
                                    children: {}
                                },
                                documents: {
                                    name: "documents",
                                    type: "directory",
                                    children: {}
                                }
                            }
                        }
                    }
                }
            }
        };
    }

    createDir(path: string): void {
        const parts = path.split('/').filter(p => p);
        let current = this.root;

        for (const part of parts) {
            if (!current.children![part]) {
                current.children![part] = {
                    name: part,
                    type: 'directory',
                    children: {}
                };
            } else if (current.children![part].type === 'file') {
                throw new Error(`Cannot create directory '${path}': Path contains a file`);
            }
            current = current.children![part];
        }

        this.saveToStorage();
    }

    createFile(path: string, content: string = ''): void {
        const parts = path.split('/').filter(p => p);
        const fileName = parts.pop();
        if (!fileName) throw new Error('Invalid file path');

        let current = this.root;
        for (const part of parts) {
            if (!current.children![part]) {
                current.children![part] = {
                    name: part,
                    type: 'directory',
                    children: {}
                };
            }
            current = current.children![part];
        }

        current.children![fileName] = {
            name: fileName,
            type: 'file',
            content
        };

        this.saveToStorage();
    }
}


