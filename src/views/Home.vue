<template>
  <main>
    <div class="container">
      <!-- 直接把 HTML <body> 里的内容粘贴进来，只需要一个根元素包裹 -->
      <div>
        <div class="page">
          <header>
            <h1>My Day</h1>
            <div id="live-clock">—</div>
          </header>

          <div class="timeline" id="timeline"></div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ScheduleView',

  data() {
    return {
      timer: null,
      hasScrolled: false
    }
  },

  created() {
    // blocks 数据放在 created() 挂到 this 上（静态数据不需要响应式）
    this.blocks = [
      {
        id: 'morning',
        startH: 7,
        startM: 0,
        endH: 8,
        endM: 0,
        timeLabel: ['7:00 am', '— 8:00 am'],
        title: 'Morning Ritual',
        tasks: [
          { text: 'Wake up refreshed after full, restful sleep', emoji: '☀️' },
          { text: 'Eat heated cereal with milk', emoji: '🥣' },
          { text: 'Light makeup & confident outfit', emoji: '✨' },
          { text: 'Make a coffee and sip it slowly', emoji: '☕' },
          { text: "Check & reply to emails, set today's schedule", emoji: '📋' }
        ]
      },
      {
        id: 'morning-work',
        startH: 8,
        startM: 0,
        endH: 12,
        endM: 0,
        timeLabel: ['8:00 am', '— 12:00 pm'],
        title: 'Deep Focus',
        tasks: [
          { text: 'Study or work on something important', emoji: '📚' },
          { text: 'Make real progress — even a small win counts', emoji: '🏆' },
          { text: 'Build a sense of self-achievement', emoji: '⭐' }
        ]
      },
      {
        id: 'lunch',
        startH: 12,
        startM: 0,
        endH: 13,
        endM: 0,
        timeLabel: ['12:00 pm', '— 1:00 pm'],
        title: 'Lunch Break',
        tasks: [
          { text: 'Eat healthy food — salad and beef', emoji: '🥗' },
          { text: 'Just enough to feel good and energised', emoji: '💚' },
          { text: 'Avoid rice and noodles (they cause afternoon fatigue)', emoji: '⚠️' }
        ]
      },
      {
        id: 'afternoon',
        startH: 13,
        startM: 0,
        endH: 17,
        endM: 0,
        timeLabel: ['1:00 pm', '— 5:00 pm'],
        title: 'Afternoon Momentum',
        tasks: [
          { text: 'Continue studying or working on something meaningful', emoji: '📖' },
          { text: 'Real progress — even a small win', emoji: '🎯' },
          { text: 'Outdoor activities during daylight', emoji: '🌿' },
          { text: 'Go to gym — exercise that boosts mood', emoji: '💪' }
        ]
      },
      {
        id: 'evening',
        startH: 17,
        startM: 0,
        endH: 20,
        endM: 0,
        timeLabel: ['5:00 pm', '— 8:00 pm'],
        title: 'Evening Warmth',
        tasks: [
          { text: 'Have dinner', emoji: '🍽️' },
          { text: 'Be with friends or family', emoji: '🫂' },
          { text: 'Do something creative or fun', emoji: '🎨' },
          { text: 'Make the day feel special', emoji: '🌟' }
        ]
      },
      {
        id: 'night',
        startH: 20,
        startM: 0,
        endH: 23,
        endM: 0,
        timeLabel: ['8:00 pm', '— 11:00 pm'],
        title: 'Wind Down',
        tasks: [
          { text: 'Play ukulele or piano', emoji: '🎵' },
          { text: 'Watch TV in apartment common room', emoji: '📺' },
          { text: 'Do some reading', emoji: '📗' },
          { text: 'Write diary or oral record — reflection', emoji: '📔', mandatory: true },
          { text: 'Take a shower & skincare routine', emoji: '🛁', mandatory: true }
        ]
      },
      {
        id: 'sleep',
        startH: 23,
        startM: 0,
        endH: 31,
        endM: 0,
        timeLabel: ['11:00 pm', '— 7:00 am'],
        title: 'Sleep',
        tasks: [{ text: 'Full, restful sleep to wake up refreshed', emoji: '🌙' }]
      }
    ]
  },

  methods: {
    // ── 原 HTML <script> 里的函数，原样粘贴进 methods，只把全局变量改成 this.xxx ──

    getMinutes(h, m) {
      return h * 60 + m
    },

    getCurrentBlock(now) {
      const nowMin = this.getMinutes(now.getHours(), now.getMinutes())
      for (let i = 0; i < this.blocks.length; i++) {
        const b = this.blocks[i]
        const start = this.getMinutes(b.startH, b.startM)
        const end = this.getMinutes(b.endH, b.endM)
        if (nowMin >= start && nowMin < end) return i
      }
      return -1
    },

    getProgress(now, block) {
      const nowMin = this.getMinutes(now.getHours(), now.getMinutes()) + now.getSeconds() / 60
      const start = this.getMinutes(block.startH, block.startM)
      const end = this.getMinutes(block.endH, block.endM)
      return Math.min(100, Math.max(0, ((nowMin - start) / (end - start)) * 100))
    },

    renderTimeline(now) {
      const activeIdx = this.getCurrentBlock(now)
      const tl = document.getElementById('timeline')
      tl.innerHTML = ''

      this.blocks.forEach((block, i) => {
        const isPast = i < activeIdx
        const isActive = i === activeIdx

        const div = document.createElement('div')
        div.className = 'block' + (isActive ? ' active' : '') + (isPast ? ' past' : '')
        if (isActive) div.id = 'active-block'

        const progress = isActive ? this.getProgress(now, block) : 0
        const remaining = isActive
          ? Math.round(
              this.getMinutes(block.endH, block.endM) -
                this.getMinutes(now.getHours(), now.getMinutes())
            )
          : 0

        div.innerHTML = `
          <div class="time-col">
            <div class="time-label">
              <span>${block.timeLabel[0]}</span>
              <span>${block.timeLabel[1]}</span>
            </div>
          </div>
          <div class="dot"></div>
          <div class="content-col">
            ${isActive ? '<span class="active-badge">Now</span>' : ''}
            <div class="block-title">${block.title}</div>
            <ul class="task-list">
              ${block.tasks
                .map(
                  (t) => `
                <li>
                  <span class="emoji-icon">${t.emoji}</span>
                  <span>${t.text}${
                    t.mandatory ? '<span class="mandatory">must do</span>' : ''
                  }</span>
                </li>
              `
                )
                .join('')}
            </ul>
            ${
              isActive
                ? `
              <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width:${progress.toFixed(1)}%"></div>
              </div>
              <div class="progress-label">
                ${Math.round(progress)}% complete ·
                ${remaining > 0 ? remaining + ' min remaining' : 'ending soon'}
              </div>`
                : ''
            }
          </div>
        `

        tl.appendChild(div)
      })
    },

    updateClock() {
      const now = new Date()
      const h = now.getHours()
      const m = now.getMinutes().toString().padStart(2, '0')
      const ampm = h >= 12 ? 'pm' : 'am'
      const h12 = h % 12 || 12
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
      const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
      document.getElementById('live-clock').textContent = `${dateStr} · ${h12}:${m} ${ampm}`
      this.renderTimeline(now)
    },

    scrollToActive() {
      if (this.hasScrolled) return
      const activeBlock = document.getElementById('active-block')
      if (activeBlock) {
        const headerH = document.querySelector('header').offsetHeight
        const top = activeBlock.getBoundingClientRect().top + window.scrollY - headerH - 24
        window.scrollTo({ top, behavior: 'smooth' })
        this.hasScrolled = true
      }
    }
  },

  mounted() {
    // 原 HTML 底部直接调用的代码，放到 mounted() 里执行
    this.updateClock()
    setTimeout(this.scrollToActive, 100)
    this.timer = setInterval(this.updateClock, 10000)
  },

  beforeUnmount() {
    // Vue 组件销毁时清除定时器（HTML 版不需要，Vue 版必须加）
    clearInterval(this.timer)
  }
}
</script>

<!-- 直接把原 HTML <style> 里的 CSS 粘贴进来，加上 scoped 即可 -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  color: #000;
  width: 1000px;
  max-width: 100%;
  height: 100vh;
  font-family: Arial, sans-serif;
}

body {
  font-family: 'DM Sans', sans-serif;
  background: #f5f0eb;
  min-height: 100vh;
  padding: 0 20px 60px;
  color: #2a2320;
}

.page {
  max-width: 680px;
  margin: 0 auto;
  padding-top: 130px;
}

header {
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100; */
  background: #f5f0eb;
  text-align: center;
  padding: 20px 20px 16px;
  border-bottom: 1px solid rgba(201, 184, 172, 0.4);
}

header h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 34px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #2a2320;
  line-height: 1.1;
}

#live-clock {
  /* font-family: 'Cormorant Garamond', serif; */
  font-size: 15px;
  font-weight: 400;
  /* font-style: italic; */
  color: #a07860;
  margin-top: 4px;
  letter-spacing: 0.03em;
}

.timeline {
  display: flex;
  flex-direction: column;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 112px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(
    to bottom,
    transparent,
    #c9b8ac 60px,
    #c9b8ac calc(100% - 60px),
    transparent
  );
}

.block {
  display: flex;
  align-items: stretch;
  position: relative;
  transition: all 0.4s ease;
}

.time-col {
  width: 112px;
  flex-shrink: 0;
  padding: 28px 20px 24px 0;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.time-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #9e8e85;
  line-height: 1.4;
}

.time-label span {
  display: block;
}

.dot {
  position: absolute;
  left: 108px;
  top: 30px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #c9b8ac;
  border: 2px solid #f5f0eb;
  z-index: 1;
  transition: all 0.4s ease;
}

.content-col {
  flex: 1;
  padding: 20px 0 20px 32px;
}

.block-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  font-weight: 500;
  color: #3d322e;
  margin-bottom: 10px;
  line-height: 1.2;
}

.task-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.task-list li {
  font-size: 14px;
  font-weight: 300;
  color: #5a4e4a;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.task-list li::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #c9b8ac;
  flex-shrink: 0;
  margin-top: 7px;
}

.mandatory {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a07860;
  background: #ede4dc;
  padding: 2px 7px;
  border-radius: 10px;
  margin-left: 6px;
  vertical-align: middle;
}

.block.active {
  background: #fff8f3;
  border-radius: 16px;
  margin: 4px 0;
  box-shadow: 0 4px 24px rgba(160, 120, 96, 0.12);
}

.block.active .dot {
  width: 13px;
  height: 13px;
  left: 106px;
  background: #a07860;
  border-color: #f5f0eb;
  box-shadow: 0 0 0 4px rgba(160, 120, 96, 0.2);
}

.block.active .time-label {
  color: #a07860;
  font-weight: 500;
}
.block.active .block-title {
  color: #a07860;
}
.block.active .task-list li {
  color: #3d322e;
}
.block.active .task-list li::before {
  background: #a07860;
}

.active-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  background: #a07860;
  padding: 3px 10px;
  border-radius: 10px;
  margin-bottom: 8px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.block.past .time-label,
.block.past .block-title,
.block.past .task-list li {
  opacity: 0.45;
}

.block.past .dot {
  background: #d8cdc8;
  width: 7px;
  height: 7px;
  left: 109px;
}

.progress-bar-wrap {
  margin-top: 14px;
  height: 3px;
  background: #ede4dc;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(to right, #c9a090, #a07860);
  border-radius: 2px;
  transition: width 60s linear;
}

.progress-label {
  font-size: 11px;
  color: #a07860;
  margin-top: 6px;
  font-weight: 300;
  letter-spacing: 0.04em;
}

.emoji-icon {
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 2px;
  line-height: 1;
}

/* ── MOBILE RWD (≤ 480px) ── */
@media (max-width: 480px) {
  body {
    padding: 0 12px 60px;
  }

  /* Header: 缩小标题和时钟，减少高度 */
  header {
    padding: 14px 16px 10px;
  }

  header h1 {
    font-size: 24px;
  }

  #live-clock {
    font-size: 12px;
  }

  /* Page: 减少 header 占用的 top 间距 */
  .page {
    padding-top: 90px;
  }

  /* Timeline 竖线：从固定 112px 移到更小的位置 */
  .timeline::before {
    left: 72px;
  }

  /* Block 整体 */
  .block {
    align-items: flex-start;
  }

  /* 时间列：从 112px 缩到 72px */
  .time-col {
    width: 72px;
    padding: 16px 10px 16px 0;
  }

  /* 时间文字更小 */
  .time-label {
    font-size: 9px;
    letter-spacing: 0.06em;
  }

  /* 竖线圆点：跟随新的 left 位置 */
  .dot {
    left: 68px;
    top: 20px;
    width: 8px;
    height: 8px;
  }

  /* 内容列：减少左侧 padding */
  .content-col {
    padding: 14px 0 14px 20px;
  }

  /* 标题字体缩小 */
  .block-title {
    font-size: 18px;
    margin-bottom: 8px;
  }

  /* 任务列表字体缩小 */
  .task-list li {
    font-size: 13px;
    gap: 8px;
  }

  /* Active block：圆点跟随 */
  .block.active .dot {
    width: 12px;
    height: 12px;
    left: 66px;
    top: 20px;
  }

  /* Past block：圆点跟随 */
  .block.past .dot {
    left: 69px;
    width: 6px;
    height: 6px;
  }

  /* Active block 内边距稍小 */
  .block.active {
    border-radius: 12px;
  }

  /* mandatory 标签换行显示 */
  .mandatory {
    display: inline-block;
    margin-left: 0;
    margin-top: 3px;
  }

  /* 进度条文字 */
  .progress-label {
    font-size: 10px;
  }
}
</style>
