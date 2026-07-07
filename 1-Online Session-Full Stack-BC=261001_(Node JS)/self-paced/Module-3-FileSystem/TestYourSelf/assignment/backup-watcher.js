const fs = require('fs');
const path = require('path');

/**
 * BackupManager - Watches a file and creates backups when it changes
 */
class BackupManager {
    constructor(filePath, backupDir = 'backups') {
        this.filePath = path.resolve(filePath);
        this.backupDir = path.resolve(backupDir);
        this.watcher = null;
        this.isProcessing = false;
        
        // Create backup directory if it doesn't exist
        this.ensureBackupDir();
    }

    /**
     * Ensures the backup directory exists
     */
    ensureBackupDir() {
        if (!fs.existsSync(this.backupDir)) {
            fs.mkdirSync(this.backupDir, { recursive: true });
            console.log(`📁 Created backup directory: ${this.backupDir}`);
        }
    }

    /**
     * Creates a backup of the file with timestamp
     */
    createBackup() {
        // Check if source file exists
        if (!fs.existsSync(this.filePath)) {
            console.error(`❌ Error: Source file not found: ${this.filePath}`);
            return false;
        }

        try {
            // Read the source file
            const data = fs.readFileSync(this.filePath);
            
            // Generate backup filename with timestamp
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const fileName = path.basename(this.filePath);
            const backupName = `${path.parse(fileName).name}_${timestamp}${path.parse(fileName).ext}`;
            const backupPath = path.join(this.backupDir, backupName);
            
            // Write backup file
            fs.writeFileSync(backupPath, data);
            
            console.log(`✅ Backup created: ${backupName}`);
            console.log(`   📍 Location: ${backupPath}`);
            return true;
        } catch (error) {
            console.error(`❌ Error creating backup: ${error.message}`);
            return false;
        }
    }

    /**
     * Starts watching the file for changes
     */
    startWatching() {
        // Check if source file exists initially
        if (!fs.existsSync(this.filePath)) {
            console.error(`❌ Error: File does not exist: ${this.filePath}`);
            console.log(`💡 Please create the file or provide a valid path.`);
            return false;
        }

        console.log(`👀 Watching file: ${this.filePath}`);
        console.log(`📂 Backup directory: ${this.backupDir}`);
        console.log(`⏳ Waiting for changes...\n`);

        // Create initial backup
        console.log(`📝 Creating initial backup...`);
        this.createBackup();

        // Set up file watcher
        try {
            this.watcher = fs.watch(this.filePath, (eventType, filename) => {
                // Only process if event is 'change' and we're not already processing
                if (eventType === 'change' && !this.isProcessing) {
                    this.isProcessing = true;
                    
                    console.log(`\n🔄 File change detected: ${filename || path.basename(this.filePath)}`);
                    
                    // Small delay to ensure file is fully written
                    setTimeout(() => {
                        this.createBackup();
                        this.isProcessing = false;
                        console.log(`👀 Still watching for changes...\n`);
                    }, 100);
                }
            });

            console.log(`✅ Watcher started successfully!\n`);
            return true;
        } catch (error) {
            console.error(`❌ Error starting watcher: ${error.message}`);
            return false;
        }
    }

    /**
     * Stops watching the file
     */
    stopWatching() {
        if (this.watcher) {
            this.watcher.close();
            console.log(`🛑 Stopped watching: ${this.filePath}`);
            this.watcher = null;
        }
    }
}

/**
 * Command-line interface
 */
function runCLI() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log(`
📋 Usage: node backup-watcher.js <file-path> [backup-directory]

Parameters:
  <file-path>         - Path to the file to watch
  [backup-directory]  - Backup directory (default: 'backups')

Examples:
  node backup-watcher.js myfile.txt
  node backup-watcher.js documents/data.json my_backups
  node backup-watcher.js /home/user/config.yaml config_backups

Press Ctrl+C to stop watching
        `);
        process.exit(0);
    }

    const filePath = args[0];
    const backupDir = args[1] || 'backups';

    console.log(`\n🚀 Starting Backup Watcher`);
    console.log(`═`.repeat(50));

    const manager = new BackupManager(filePath, backupDir);
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log(`\n\n👋 Shutting down...`);
        manager.stopWatching();
        process.exit(0);
    });

    process.on('SIGTERM', () => {
        console.log(`\n\n👋 Shutting down...`);
        manager.stopWatching();
        process.exit(0);
    });

    // Start watching
    const success = manager.startWatching();
    
    if (!success) {
        process.exit(1);
    }
}

// Export for use as a module
module.exports = BackupManager;

// Run if called directly
if (require.main === module) {
    runCLI();
}