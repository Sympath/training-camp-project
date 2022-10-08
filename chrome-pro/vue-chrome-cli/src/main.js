import {
    downGit,
    installDependencies
} from '../utils/index';
import path from 'path';
import Log from '../utils/log';

const log = new Log();

export async function createProject(options) {
    const cwd = process.cwd()
    // 拉取
    await downGit(options.url, args)
    log.success('项目创建成功\n')
    installDependencies(path.join(cwd, options.projectName), 'npm')
}