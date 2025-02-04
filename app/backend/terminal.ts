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
    public success: boolean;

    constructor() {
        this.root = this.loadFromStorage() || this.createDefaultFS();
        this.currentDir = ["root", "home", "user"];
        this.success = false;
    }

    public ls_command(): string {
        const resolvedPath = this.resolveDirPath(null);
        const nodes: string[] = [];
        
        if (typeof resolvedPath === "string") {
            return resolvedPath;
        } else {
            if (resolvedPath.children) {
                for (const child in resolvedPath.children) {
                    const node = resolvedPath.children[child];
                    nodes.push(node.type === 'directory' ? `📁 ${child}` : `📄 ${child}`);
                }
            }
        }

        this.success = true;
        return nodes.join("\n") || "(empty directory)";
    }

    public cd_command(path: string | null): string {
        if (!path) {
            this.currentDir = ["root", "home", "user"];
            this.success = true;
            return "Changed to home directory";
        }

        const fullPath: string[] | null = this.normalizePath(path);
        if (fullPath === null) {
            this.success = false;
            return "Already at the lowest directory.";
        }

        const rootNode = fullPath.shift();
        let current: FileSystemNode = this.root;
        
        for (const part of fullPath) {
            if (!current.children || !(part in current.children)) {
                this.success = false;
                return `Directory not found: ${part}`;
            }
            if (current.children[part].type !== "directory") {
                this.success = false;
                return `Not a directory: ${part}`;
            }
            current = current.children[part];
        }

        if (rootNode) {
            fullPath.unshift(rootNode);
        }

        this.currentDir = fullPath;
        this.success = true;
        return `Directory changed to: /${fullPath.join("/")}`;
    }

    public mkdir_command(dirName: string): string {
        if (!dirName) {
            this.success = false;
            return "Directory name required";
        }

        const currentDir = this.resolveDirPath(null);
        if (typeof currentDir === "object") {
            if (currentDir.children && currentDir.children[dirName]) {
                this.success = false;
                return `Cannot create directory '${dirName}': Name already exists`;
            }

            currentDir.children = currentDir.children || {};
            currentDir.children[dirName] = {
                name: dirName,
                type: "directory",
                children: {}
            };

            this.saveToStorage();
            this.success = true;
            return `Created directory: ${dirName}`;
        }
        return "Invalid current directory";
    }

    public touch_command(path: string) {
        if (!path) {
            return "Usage: touch <file name>"
        }

        const fullPath: string[] | null = this.normalizePath(path)

        if (fullPath === null) {
            return "Already at the lowest directory."
        }
        fullPath.shift()

        let current: FileSystemNode | undefined = this.root
        
        for (const part of fullPath) {
            if (!current.children || !(part in current.children)) {
                current.children![part] = {
                    name: part,
                    type: "file",
                    content: ""
                }
                return `Created a file: ${part}`
            } else if (current.children[part].type !== "directory") {
                if (part !== fullPath[fullPath.length - 1]) {
                    return `Not a directory: ${part}`
                } else {
                    return `File '${part}' already exists`
                }
            }
            current = current.children[part];
        }
        return `Directory named '${current.name}' already exists`
    }

    public cat_command(fileName: string): string {
        if (!fileName) {
            this.success = false;
            return "File name required";
        }

        const currentDir = this.resolveDirPath(null);
        if (typeof currentDir === "string") {
            this.success = false;
            return currentDir;
        }

        if (!currentDir.children?.[fileName]) {
            this.success = false;
            return `File not found: ${fileName}`;
        }

        const file = currentDir.children[fileName];
        if (file.type === "directory") {
            this.success = false;
            return `Cannot read '${fileName}': Is a directory`;
        }

        return file.content || "(empty file)";
    }

    public echo_command(args: string): string {
        const match = args.match(/^(.*?)\s*>\s*(\S+)$/);
        if (!match) return "Usage: echo [text] > [file]";

        const [, text, fileName] = match;
        const currentDir = this.resolveDirPath(null);
        if (typeof currentDir === "string") {
            this.success = false;
            return currentDir;
        }

        if (!currentDir.children?.[fileName]) {
            currentDir.children = currentDir.children || {};
            currentDir.children[fileName] = {
                name: fileName,
                type: "file",
                content: text.trim()
            };
            this.saveToStorage();
            this.success = true;
            return `Created and wrote to ${fileName}`;
        }

        if (currentDir.children[fileName].type !== "file") {
            this.success = false;
            return `Not a file: ${fileName}`;
        }

        currentDir.children[fileName].content = text.trim();
        this.saveToStorage();
        this.success = true;
        return `Wrote to ${fileName}`;
    }

    public pwd_command(): string {
        return "/" + this.currentDir.join("/");
    }

    public cp_command(path1: string, path2: string): string {
        if (!path1 || !path2) {
            this.success = false;
            return "Usage: cp <file1> <file2>";
        }

        const fullPath1: string[] | null = this.normalizePath(path1);
        const fullPath2: string[] | null = this.normalizePath(path2);

        if (fullPath1 === null || fullPath2 === null) {
            this.success = false;
            return "Already at the lowest directory.";
        }

        // Get source file
        const sourceDir = this.resolveDirPath(path1.substring(0, path1.lastIndexOf('/')) || null);
        const sourceFileName = path1.split('/').pop() || path1;
        if (typeof sourceDir === "string") {
            this.success = false;
            return sourceDir;
        }
        if (!sourceDir.children?.[sourceFileName]) {
            this.success = false;
            return `File not found: ${sourceFileName}`;
        }
        if (sourceDir.children[sourceFileName].type === "directory") {
            this.success = false;
            return `Cannot copy '${sourceFileName}': Is a directory`;
        }
        const copiedContent = sourceDir.children[sourceFileName].content;

        // Get or create destination file
        const destDir = this.resolveDirPath(path2.substring(0, path2.lastIndexOf('/')) || null);
        const destFileName = path2.split('/').pop() || path2;
        if (typeof destDir === "string") {
            this.success = false;
            return destDir;
        }

        destDir.children = destDir.children || {};
        destDir.children[destFileName] = {
            name: destFileName,
            type: "file",
            content: copiedContent
        };

        this.saveToStorage();
        this.success = true;
        return `Copied from '${sourceFileName}' to '${destFileName}'`;
    }

    private normalizePath(path: string | null): string[] | null {
        if (path) {
            const nodes = path.split("/").filter(p => p);
            const parts = this.currentDir.concat(nodes);
            const stack: string[] = [];
        
            for (const part of parts) {
                if (part === "." || part === "") {
                    continue;
                }
                if (part === "..") {
                    if (stack.length > 1) {
                        stack.pop();
                    } else return null;
                } else {
                    stack.push(part);
                }
            }
        
            return stack;
        }
        return [...this.currentDir];
    }

    private resolveDirPath(path: string | null): FileSystemNode | string {
        const fullPath: string[] | null = this.normalizePath(path);
        if (fullPath === null) {
            return "Already at the lowest directory.";
        }

        let current: FileSystemNode = this.root;
        for (const part of fullPath.slice(1)) {
            if (!current.children || !(part in current.children)) {
                return `Directory not found: ${part}`;
            }
            if (current.children[part].type !== "directory") {
                return `Not a directory: ${part}`;
            }
            current = current.children[part];
        }
        return current;
    }

    private loadFromStorage(): FileSystemNode | null {
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
                                documents: {
                                    name: "documents",
                                    type: "directory",
                                    children: {}
                                },
                                downloads: {
                                    name: "downloads",
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
}


