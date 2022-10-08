import inquirer from 'inquirer';
import Log from '../utils/log';
const log = new Log();

const DEFAULT_OPTIONS = {
    type: 'vue2',
    projectName: 'my-chrome-extension',
    backgroundMode: 'js',
    devTool: false,
    newtab: false,
}
let questions = []
// 框架类型
questions.push({
    name: "type",
    message: "你想创建一个什么类型的模板(vue2|vue3|react|ssr)",
    default: DEFAULT_OPTIONS.type
})
// devTool
questions.push({
    name: 'devTool',
    message: '是否需要对开发者工具(devTool)做扩展开发?',
    default: DEFAULT_OPTIONS.devTool,
})
// newtab
questions.push({
    name: 'newTab',
    message: '是否需要对新标签页(newtab)做扩展开发?',
    default: DEFAULT_OPTIONS.newtab,
})

export async function cli (args) {
    cmd.command('init').description('初始化模板').action(async (args) => {
        typeof args !== 'string' && (console.log(log.error('缺少必填参数')), process.exit(1))
        console.log(log.warning('vue开发chrome脚手架初始化模板 \n'))
        // 填选项
        let chooses = await inquirer.prompt(questions)
        let chooseMap = {
            'vue2': {
                url: 'Sympath/vue-chrome-template'
            }
        }
        await createProject({
            ...chooseMap[chooses.type],
            projectName: args
        })
        
    })
    cmd.parse(process.argv)
    
    await createProject(options);
}