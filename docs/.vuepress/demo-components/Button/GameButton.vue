<template>
  <div class="game-button">
    一个游戏风格的按钮
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
<style lang="stylus" scoped>
$btn-shadow-width = 5px;
$shadow = #0099C0;
.game-button {
  border-radius: 30px;
  padding: 12px 20px;
  user-select: none;
  line-height: 1;
  cursor: pointer;
  position: relative;
  outline: none;
  border: none;
  display: inline-block;
  font-weight: bold;
  background-color: unset;
  transform: translateY(-2.5px);
  box-shadow: 0px $btn-shadow-width 0px $shadow;
  color: #fff;
  background-color: #00BBEC;
  &:hover {
    transform: translateY(0);
    box-shadow: 0px 0px 0px $shadow;
  }
  &:active {
    background-color:  #0099C0;
    box-shadow: inset 0px 5px 0px #0086A9;
    transform: translateY(2.5px);
    color: #fff;
  }
}
</style>
