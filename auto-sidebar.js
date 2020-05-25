const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');


// 解析需要遍历的文件夹
const rootDir = 'docs';
// 输出文件
const outFileName = 'docs/_sidebar.md';
// 当前目录
let catalog = {};
// 每行目录数据
let catalogText = [];

/**
 * 文件遍历添加
 * @param filePath 需要遍历的文件路径
 * @param level 当前文件展示级别
 */
const fileDisplay = (filePath, level) => {
    // 根据文件路径获取文件信息，返回一个fs.Stats对象
    const stats = fs.statSync(filePath);
    // 是文件 && 级别非根目录 && 是md文件 && !归属于父级文件夹的md文件
    const isFileShow = stats.isFile() && level > 0 && filePath.endsWith('.md') && !filePath.endsWith('README.md');
    // 是文件夹 && 包含README.md文件
    const isDirectoryShow = stats.isDirectory() && fs.existsSync(`${filePath}/README.md`);

    if (isFileShow || isDirectoryShow) {
        const fileName = stats.isDirectory() ? `${filePath}/README.md` : filePath;  // 文件路径
        const fileTitle = fs.readFileSync(fileName).toString().split('\n').find(line => line.startsWith('# ')) || '';   // 目录展示标题
        const lineText = `${''.padEnd(level * 4)}* [${level > 0 ? '' : '**'}${fileTitle.substring(2)}${level > 0 ? '' : '**'}](${fileName.substring(rootDir.length + 1)})\n`;

        // fs.appendFileSync(outFileName, lineText);
        catalogText.push(lineText);
        catalog[filePath] = fileTitle.substring(2);

        if (isDirectoryShow) {  // 文件夹递归
            fs.readdirSync(filePath).forEach((filename) => {
                fileDisplay(path.join(filePath, filename), level + 1);
            });
        }
    }
}


const resetCatalog = () => {
    catalog = {};
    catalogText = [];
    // 调用文件遍历方法
    fileDisplay(rootDir, -1);
    fs.writeFileSync(outFileName, catalogText.join(''));
};

resetCatalog();

let watchFile = '';
chokidar.watch(rootDir, {
    persistent: true,
    ignored: /(^|[\/\\])(\.|_)./, // 忽略"点" "_"文件
    ignoreInitial: false,
    cwd: '.', // 表示当前目录
}).on('all', (event, path) => {
    fs.stat(path, (error, fileStat) => {
        if (event === 'unlink' || event === 'unlinkDir' || (fileStat.isFile() && path.endsWith('.md')) || fileStat.isDirectory() && fs.existsSync(`${path}/README.md`)) {
            // 目录标题未修改时，不需要重新生成文件
            if (event === 'change' && catalog[path] === fs.readFileSync(path).toString().split('\n').find(line => line.startsWith('# '))) {
                return;
            }
            watchFile = `${event}|${path}`;
            // 延时处理，防止中间状态
            setTimeout(() => {
                if (watchFile === `${event}|${path}`) {
                    resetCatalog();
                    watchFile = '';
                }
            }, 100);
        }
    });
});
