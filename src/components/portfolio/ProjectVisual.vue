<script setup>
defineProps({ project: { type: Object, required: true } })
</script>

<template>
  <div
    :class="['project-visual', project.image ? 'project-visual--preview' : `project-visual--${project.visual}`]"
    :style="project.palette ? { '--c1': project.palette[0], '--c2': project.palette[1], '--c3': project.palette[2] } : undefined"
    aria-hidden="true"
  >
    <div class="browser-bar">
      <i></i><i></i><i></i><span></span>
    </div>
    <div class="visual-content">
      <img v-if="project.image" class="project-preview" :src="project.image" alt="" loading="lazy" />
      <template v-else-if="project.visual === 'mountain'">
        <div class="mountain-title">
          EXPLORE<br />BEYOND
        </div><div class="mountains"></div>
      </template>
      <template v-else-if="project.visual === 'dashboard'">
        <div class="dash-sidebar"></div><div class="dash-lines">
          <i v-for="n in 4" :key="n"></i>
        </div><div class="dash-chart"></div>
      </template>
      <template v-else-if="project.visual === 'shop'">
        <div class="shop-title">
          NEW<br />COLLECTION
        </div><div class="shop-people">
          <i></i><i></i>
        </div>
      </template>
      <template v-else-if="project.visual === 'chart'">
        <div class="chart-bars">
          <i v-for="n in 11" :key="n" :style="{ height: `${15 + ((n * 17) % 68)}%` }"></i>
        </div><div class="chart-donut"></div>
      </template>
      <template v-else-if="project.visual === 'studio'">
        <div class="studio-orb"></div><div class="studio-copy">
          NOVA<br />STUDIO
        </div>
      </template>
      <template v-else>
        <div class="health-phone">
          <i></i><b>82</b><span>daily score</span>
        </div><div class="health-pulse"></div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-visual {
  height: 11.5625rem;
  padding: .625rem;
  overflow: hidden;
  background: var(--c1);

  .browser-bar { height: 1.0625rem; display: flex; align-items: center; gap: .25rem; opacity: .8; }
  .browser-bar i { width: .25rem; height: .25rem; border-radius: 50%; background: #8a9aa2; }
  .browser-bar span { width: 34%; height: .25rem; margin-left: auto; border-radius: .25rem; background: rgba(255,255,255,.12); }
  .visual-content {
    position: relative;
    height: calc(100% - 1.0625rem);
    overflow: hidden;
    border-radius: .625rem;
  }
}

.project-visual--preview {
  background: #071016;

  .visual-content { background: #050b0f; }
}

.project-preview {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: inherit;
  object-fit: cover;
  object-position: top center;
}

.mountain-title { position: absolute; z-index: 2; top: 18%; left: 7%; color: white; font-size: .88rem; font-weight: 900; line-height: 1.1; }
.mountains { position: absolute; right: -10%; bottom: -22%; width: 90%; height: 90%; background: linear-gradient(135deg, transparent 48%, var(--c3) 49% 55%, #0b1117 56%); transform: rotate(-7deg); filter: drop-shadow(-1.5625rem -.3125rem 0 rgba(79,101,112,.5)); }

.project-visual--dashboard .visual-content { display: grid; grid-template-columns: 22% 1fr; gap: .5rem; padding: .5rem; background: #0b1721; }
.dash-sidebar { border-radius: .1875rem; background: #071019; border: .0625rem solid rgba(255,255,255,.06); }
.dash-lines { display: grid; gap: .4375rem; align-content: start; }
.dash-lines i { height: .75rem; border-radius: .125rem; background: linear-gradient(90deg, var(--c2) 0 8%, rgba(255,255,255,.07) 9%); }
.dash-chart { position: absolute; right: 8%; bottom: 10%; width: 50%; height: 38%; border-bottom: .125rem solid var(--c2); transform: skewY(-10deg); box-shadow: inset 0 -1rem rgba(14,142,173,.08); }

.project-visual--shop { background: #e8ebea; }
.project-visual--shop .visual-content { color: #131719; }
.shop-title { position: absolute; top: 27%; left: 7%; font-size: 1.05rem; line-height: 1; font-weight: 900; }
.shop-people { position: absolute; right: 14%; bottom: 0; display: flex; gap: .3125rem; }
.shop-people i { width: 2rem; height: 5.9375rem; border-radius: 1.125rem 1.125rem .1875rem .1875rem; background: linear-gradient(#b57e63 0 20%, #d4b096 21% 50%, #4b3229 51%); }
.shop-people i:last-child { background: linear-gradient(#6f4e3d 0 20%, #ead8c6 21% 50%, #9a765b 51%); }

.project-visual--chart .visual-content { background: #07131f; border: .0625rem solid rgba(255,255,255,.04); }
.chart-bars { position: absolute; inset: 28% 34% 12% 8%; display: flex; align-items: end; gap: .1875rem; border-bottom: .0625rem solid rgba(255,255,255,.13); }
.chart-bars i { flex: 1; min-height: 6%; background: linear-gradient(var(--c3), var(--c2)); border-radius: .125rem .125rem 0 0; }
.chart-donut { position: absolute; right: 6%; top: 24%; width: 23%; aspect-ratio: 1; border: .4375rem solid rgba(0,231,240,.13); border-top-color: var(--c2); border-right-color: var(--c3); border-radius: 50%; }

.project-visual--studio .visual-content { background: radial-gradient(circle at 35% 50%, rgba(119,71,255,.55), transparent 25%), #0e0b20; }
.studio-orb { position: absolute; left: 16%; top: 12%; width: 46%; aspect-ratio: 1; border: .0625rem solid var(--c2); border-radius: 50% 44% 55% 48%; box-shadow: 0 0 1.875rem var(--c2); }
.studio-copy { position: absolute; right: 8%; bottom: 12%; font-size: 1rem; font-weight: 900; letter-spacing: .13em; text-align: right; }

.project-visual--health { background: #edf7f3; }
.health-phone { position: absolute; left: 12%; top: 8%; width: 31%; height: 90%; display: grid; place-items: center; align-content: center; border: .1875rem solid #173f36; border-radius: .75rem; color: #173f36; background: white; }
.health-phone i { width: 2.0625rem; aspect-ratio: 1; border: .3125rem solid var(--c2); border-top-color: var(--c3); border-radius: 50%; }
.health-phone b { margin-top: .3125rem; font-size: .8rem; }
.health-phone span { font-size: .38rem; }
.health-pulse { position: absolute; right: 8%; top: 47%; width: 44%; height: 24%; border-bottom: .125rem solid var(--c3); clip-path: polygon(0 50%, 20% 50%, 27% 10%, 36% 90%, 46% 35%, 55% 50%, 100% 50%, 100% 65%, 0 65%); background: var(--c3); }
</style>
