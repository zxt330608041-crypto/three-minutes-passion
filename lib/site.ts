export const sections = [
  {name:'音乐与声音',emoji:'♫',blurb:'让生活多一点旋律'},
  {name:'艺术与设计',emoji:'✳',blurb:'用自己的方式表达'},
  {name:'运动与健身',emoji:'↗',blurb:'与身体重新连接'},
  {name:'户外与自然',emoji:'☼',blurb:'走出房间探索世界'},
  {name:'手工与制作',emoji:'✂',blurb:'创造一些看得见的美好'},
  {name:'美食与饮品',emoji:'☕',blurb:'日常生活里的仪式感'},
  {name:'知识与思维',emoji:'◇',blurb:'让好奇心一直生长'},
  {name:'科技与数字',emoji:'⌘',blurb:'把点子变成作品'},
  {name:'收藏与鉴赏',emoji:'✦',blurb:'发现细节中的故事'},
  {name:'游戏与娱乐',emoji:'♟',blurb:'认真地玩，也是一种生活'},
  {name:'生活与养成',emoji:'❀',blurb:'用耐心养出小小的世界'},
  {name:'表演与社交',emoji:'✺',blurb:'让人与人之间更有趣'},
];
export const url = (slug: string, base: string) => `${base}hobbies/${slug}/`;
export const diffLabel: Record<string,string> = {easy:'易上手',medium:'需要练习',hard:'挑战较高'};
export const budgetLabel: Record<string,string> = {free:'免费可试',low:'低预算',medium:'适中预算',high:'较高预算'};
