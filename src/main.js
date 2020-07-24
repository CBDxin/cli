import program from "commander";
import symbol from "log-symbols";
import chalk from "chalk";

import create from './create';

// console.log(process.argv);

program.usage('<command> [options]')

program
    .command('create')
    .description('创建一个项目')
    .alias('c')
    .action(()=>{
      create(...process.argv.slice(3))
    });

//command第一个参数为命令名称，alias为命令的别称， 其中<>包裹的为必选参数 []为选填参数 带有...的参数为剩余参数的集合
program
    .command('init <type> [name] [otherParams...]')
    .alias('i')
    .description('Generates new code')
    .action(function (type, name, otherParams) {
      console.log('type', type);
      console.log('name', name);
      console.log('other', otherParams);
      // 在这里执行具体的操作
    });
  

program
    .version(require('../package.json').version, '-v --version')
    .parse(process.argv);
