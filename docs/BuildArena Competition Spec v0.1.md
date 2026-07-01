# BuildArena Competition Spec v0\.1

## 赛事方设置：

### 第一赛季

- 时间：2026\.7\-2026\.8

- 主题："To Infinity, and Beyond"

    - 来自《玩具总动员》巴斯光年的 catch phrase

    - 和 Uniforce AI 的愿景呼应

    - 和 Besiege DLC "The Broken Beyond" 呼应玩家社群热度

        

- 题目：

    建造单体机械装置，使其在 The Broken Beyond 太空沙盒中从起始星球出发，实现稳定入轨运行，并在星球轨道上完成尽可能多的周期运行。

    轨迹跟踪和判定点为 Starting Block，机械体其他元件的轨迹不单独约束。

    最终成绩由运行表现、建造成本和赛道系数共同决定。

    

## 组别设计：

### 正式赛道只设置两个 track：

1. Build Autopilot

    - 用户在建造前定义 agent / prompt / workflow

    - 建造开始后，agent 自主完成结构生成

    - 建造过程中人类不得继续通过自然语言、代码修改或手动编辑干预结构生成

    - 建造完成后，人类只允许修改控制配置，不允许修改结构

    - 运行阶段由人类手动驾驶

    - 赛道系数：1\.15

        

2. Build Copilot

    - 人在回路，用户可以通过多轮自然语言指令和 agent 协同完成建造

    - 所有结构生成和结构修改仍必须通过 BuildArena MCP/API 完成

    - 人类不得直接手动编辑 BSG 结构

    - 建造完成后，人类只允许修改控制配置，不允许修改结构

    - 运行阶段由人类手动驾驶

    - 赛道系数：1\.00

        

### 说明：

- 本赛事中的 pilot 指的是建造阶段，而不是运行阶段。

- 两个正式赛道最终运行都由人类真实驾驶。

- AI 造出不完美的机械，但人类能把它开好，也属于比赛的核心乐趣。

- Autopilot 难度更高，因此通过赛道系数进行一定补偿（1\.15）。

- Copilot 允许人类参与建造指导，但仍要求所有结构变化由 agent/API 产生。

    

### Human Boss Challenge：



- 人类手动建造作品可以作为展示组参与。

- 不进入两个正式 AI 赛道的技术总榜。

- 可设置 Best Human Build / Most Creative Machine / Community Favorite 等展示奖项。

- 不允许使用 MOD。

- 不允许使用无限 slider、rescale、非法参数等超出原版游戏设定的功能。

    

## 参与方式：

1. 参赛者 fork 并下载 BuildArena 2\.0 代码库

2. 购买并下载 Besiege 游戏和 The Broken Beyond DLC

3. 按照 BuildArena 2\.0 配置 SKILLS，配置游戏文件路径和 MCP 服务器

4. 参赛者选择 Build Autopilot 或 Build Copilot 赛道

5. 参赛者使用赛季题目 md、自定义 agent 提示词、自定义 agent 框架 / 工具 / IDE，通过 BuildArena MCP 执行建造

6. MCP 执行后自动保存：

    1. Agent 建造得到的原始机械 BSG

    

    2. 有效建造历史 JSON

        - 不包含查询操作和错误回退

        - 用于通过 BA JSON 解析器完全重建 BSG

            

    3. 全量建造历史 JSON

        - 包含查询操作、失败操作和错误回退

        - 用于记录完整建造过程、错误步骤和失败原因

            

    4. Agent 建造过程文本输出记录 MD

        

7. 参赛者在游戏沙盒中加载机械 BSG

8. 参赛者允许修改元件控制参数，但不得修改结构

9. MCP 注入的轨迹跟踪脚本记录 Starting Block 的运行轨迹，并导出 trajectory CSV

10. 参赛者手动驾驶机械完成任务，全程录制视频

11. 参赛者将视频上传到 YouTube / Bilibili 等视频平台公开发布，并带上 \#BuildArena \#AI4E 等标签

12. 参赛者提交自己认为最好的 1 个机械装置

    

## 提交：

### Build Autopilot / Build Copilot 提交产物：

1. manifest\.json

2. Agent 建造得到的原始机械 BSG

3. Agent 建造得到的有效建造历史 JSON

4. Agent 建造得到的全量建造历史 JSON

5. Agent 建造过程的文本输出记录 MD

6. 人类手动修改控制参数后的运行机械 BSG

7. 人类手动控制机械运行的视频链接 URL

8. 机械运行产生的轨迹 CSV

    

### manifest\.json 至少包含：

- team\_name

- machine\_name

- track：Build Autopilot / Build Copilot

- BuildArena version

- Besiege version

- DLC version

- 使用的 LLM list

- 使用的 agent framework / IDE

- 是否使用视觉反馈

- 建造轮次

- MCP tool call 数量

- 提交文件 hash

- 视频链接 URL

    

### Human Boss Challenge 提交产物：

1. 人类手动建造的运行机械 BSG

2. 人类手动控制机械运行的视频链接 URL

3. 机械运行产生的轨迹 CSV

    

## 校验：

### Build Autopilot / Build Copilot：

- 真实性校验 A：

    - BA JSON 解析器 \+ 有效建造历史 JSON 重建机械 BSG

    - 若重建 BSG 与提交的原始机械 BSG 不符，提交无效

        

- 真实性校验 B：

    - 全量建造历史 JSON 与文本输出记录 MD 进行一致性检查

    - 若存在明显缺失、伪造或不一致，提交无效

        

- 人工修改校验 A：

    - 对比原始机械 BSG 和人类调参后 BSG 的结构字段

    - 若 block type、block count、position、orientation、scale、connection 发生变化，提交无效

        

- 人工修改校验 B：

    - 检查 Data 字段是否只修改合法控制参数

    - 若出现无限 slider、负力、非法范围参数等，提交无效

        

- MOD 校验：

    - 若 BSG 中存在未允许 MOD 字段，提交无效

        

- 视频有效性校验：

    - 视频链接 URL 无效或不可访问，提交无效

        

- 轨迹有效性校验：

    - trajectory CSV 缺失、格式错误或无法对应 Starting Block，提交无效

        

- 赛道校验：

    - Build Autopilot 中若发现建造开始后的人工自然语言指导或手动结构干预，转入 Build Copilot 或判定无效

        

### Human Boss Challenge：

- re\-scale 校验：

    - 若存在 scale 参数不等于 1\.0 的结构，提交无效

        

- 参数设置校验：

    - 若 Data 字段存在非法范围参数，提交无效

        

- MOD 校验：

    - 若使用 MOD，提交无效

        

## 评分：



### Performance Score：三种建造采用完全一致的 Performance Score 计算

- Performance Score 只根据 trajectory CSV 和运行结果计算，不区分作品来源是 agent 还是人类

- 因此 Human Boss Challenge 的性能分可以直接作为人类基准，与两个 AI 正式赛道横向对比

- Performance Score 组成：

    - Orbit Progress：50%

        - 根据 Starting Block 完成的轨道周期数计算

        - 完成 3 个周期可获得该项满分

        - 未完成完整周期时按累计角位移给部分分

    - Orbit Stability：25%

        - 根据轨道半径波动、降轨趋势、异常偏离程度计算

    - Survival：15%

        - 根据机械完整性、Starting Block 是否保持有效连接、运行是否中断计算

    - Style / Fun Bonus：10%

        - 奖励有趣、离谱、优雅、具有传播价值的机械设计

        - 由社区投票判断



### Cost Efficiency Score：

- Cost Efficiency Score 用于衡量“以多低的结构成本、推理成本和试错成本完成建造”

- Build Autopilot / Build Copilot 的 Cost Efficiency Score 同时考虑：

    1. Mechanical Cost：机械结构成本

    2. Token Cost：LLM 推理消耗

    3. Error Cost：失败操作和无效建造尝试成本

- Mechanical Cost 根据机械使用的模块数量和模块点数计算

    - 模块越少、模块点数越低，Mechanical Cost 越低

    

- Token Cost 根据 agent 建造全过程中消耗的 input token、output token、reasoning token、cached token 等统计



- Error Cost 根据全量建造历史 JSON 中的失败操作、非法操作、回退操作、重复无效尝试计算

    - 失败操作越多，说明 agent 对空间状态、连接点、模块约束和任务目标的理解越差，应当形成成本惩罚

    - 

### Token Cost 统计：

- 第一优先级：使用官方 BuildArena Token Logger

    - 参赛者通过官方 wrapper / gateway 调用 LLM

    - wrapper 自动记录每次模型调用的 token usage

    - 生成 token\_usage\.json

    - 这是最推荐、最准确、最适合正式获奖复核的方式



- 第二优先级：使用模型 API 返回的 usage 字段

    - 对 OpenAI、Anthropic、Google、DeepSeek、Qwen 等 API 返回的 token usage 进行统一记录

    - 需要记录 input token、output token、cached token、reasoning token 等字段

    - 所有调用记录写入 token\_usage\.json



- 第三优先级：离线估算

    - 如果使用本地模型、IDE agent 或无法直接获得 token usage 的框架

    - 需要提交完整 prompt / response / tool\-call transcript

    - 官方使用对应 tokenizer 或统一近似 tokenizer 进行估算

    - 该结果标记为 estimated token cost



- 获奖候选作品必须通过官方 token 复核

- 若无法提供可信 token 记录，则可以保留提交资格，但 Token Efficiency Score 记为最低档

### token\_usage\.json 至少包含：

- model\_name

- provider

- call\_id

- timestamp

- input\_tokens

- output\_tokens

- reasoning\_tokens

- cached\_tokens

- total\_tokens

- source：official\_logger / api\_usage / estimated



### Error Cost 统计建议：

- Error Cost 基于全量建造历史 JSON 计算

- 每条 MCP tool call 需要标记执行结果：

    - success：成功执行

    - failed：包含对应的错误类型

- Error Cost 可按不同失败类型设置不同权重

- 推荐同时展示：

    - failed tool call count

    - failed tool call ratio

    - rollback count

    - geometry error count

    - connection error count



### Cost Efficiency Score 计算：

- Build Autopilot / Build Copilot：

    Cost Efficiency Score = 0\.4 × Mechanical \+ 0\.3 × Token \+ 0\.3 × Error

- Human Boss Challenge：

    Cost Efficiency Score = Mechanical



### Raw Score：

- Raw Score = max\(0, Performance Score \- Cost Penalty\)



### Final Score：

- Build Autopilot / Build Copilot：

    - Final Score = Raw Score × Track Coefficient

- Human Boss Challenge：

    - 不进入 AI 正式总榜

    - 展示 Human Performance Score 作为和 AI 造物横向性能对比





## 排行榜设计：



### 主排行榜：

1. 排名

2. 用户名 / 队伍名

3. 机器昵称

4. Track：Build Autopilot / Build Copilot

6. 建造预览

7. 视频链接

8. 使用的 LLM list

9. 单 agent / 多 agent

10. 是否使用视觉反馈

11. 建造迭代轮次

12. MCP tool call 数量

13. 模块数量

14. 模块点数

15. Performance Score

16. Cost Efficiency Score

17. Raw Score

18. Final Score

19. Validation Status：Provisional / Verified

    

### 分赛道排行榜：

- Build Autopilot 单独排名

- Build Copilot 单独排名

- Human Boss Challenge 单独展示

    

### 展示页面：

- 机器完成态 3D 预览

- step\-wise 建造过程回放

    - 左侧展示 agent 文本输出和 MCP tool call

    - 右侧展示 Three\.js 逐步建造场景

- 视频链接用于社区传播和人工复核

    

## 奖项设计：



- Agent Master Builder

    - 授予 Final Score 最高的正式赛道作品

    - 代表赛季综合最强 AI 建造作品

    - 若该作品同时是某个 track 第一名，则该 track 的奖金/实物奖励顺延给该 track 下一名

    - 但该作品仍保留对应 track winner 的展示 title

- Powerful but Brutal

    - 授予高性能但高成本的暴力美学作品

    - 计算 Brutality Score：

        Brutality Score = Performance \+ Cost

    - 仅在 Performance Score 达到基础门槛\>= 70的作品中评选

    - 该奖项鼓励“贵、重、猛、离谱，但确实能跑”的机械设计

- Cheap Thrills

    - 授予低成本但性能优秀的高性价比作品

    - 计算 Thrift Score：

        Thrift Score = Performance \- 2 \* Cost

    - 仅在 Performance Score 达到基础门槛 \>= 60的作品中评选

    - 若多个作品 Thrift Score 接近，则优先选择 Mechanical Cost 更低的作品

    - 该奖项鼓励“便宜、轻量、简陋，但意外好用”的机械设计

### Track Titles：

- Best Build Autopilot

    - 授予 Build Autopilot 赛道 Final Score 最高的作品

    - 若该作品已获得 Agent Master Builder，则保留 title，但实物/奖金奖励顺延

- Best Build Copilot

    - 授予 Build Copilot 赛道 Final Score 最高的作品

    - 若该作品已获得 Agent Master Builder，则保留 title，但实物/奖金奖励顺延

### 奖项去重规则：

- 同一作品可以同时拥有多个展示 title

- 但同一作品最多领取一个主要技术奖项的奖金或实物奖励

- 奖项优先级：

    1. Agent Master Builder

    2. Powerful but Brutal

    3. Cheap Thrills

    4. Best Build Autopilot / Best Build Copilot

- 若某作品已经获得更高优先级奖项，则低优先级奖项的奖金/实物奖励顺延给下一名符合条件的作品



### 社区奖项：

- Community Favorite

- Most Creative Machine

- Funniest Failure

- Best Human Boss Build

    

## 官方复核：

- 所有提交先进入 Provisional leaderboard

- 获奖候选作品需要进入 Verified 流程

- 官方复核内容包括：

    1. 文件完整性检查

    2. BSG 结构 diff 检查

    3. 参数合法性检查

    4. 轨迹 CSV 检查

    5. 视频链接检查

    6. 必要时进行官方 clean rerun

- 只有 Verified 作品可以获得正式技术奖项和奖金

    

