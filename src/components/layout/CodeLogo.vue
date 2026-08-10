<template>
  <span class="code-logo" aria-hidden="true"><i>&lt;</i><b>/</b><i>&gt;</i></span>
</template>

<style lang="scss" scoped>
.code-logo {
  display: inline-flex;
  align-items: center;
  color: var(--color-primary);
  font-family: var(--font-mono);
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.18em;

  b { font-weight: 800; transform: translateY(-1px); }
  i { font-style: normal; }
}
</style>
