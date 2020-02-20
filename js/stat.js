'use strict'

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_SHADOW_GAP = 10;

var FONT_GAP = 20;
var MAX_WIDTH_TEXT = CLOUD_WIDTH - (FONT_GAP * 2);

var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_INDENT = 50;
var BAR_MAIN_COLOR = 240;
var BAR_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
var BAR_GAP_Y = 20;
var START_POINT_Y = CLOUD_HEIGHT;

var setRandomSaturationColor = function (hue) {
  return 'hsl(' + hue + ', ' + Math.random() * 100 + '%, 50%)';
};

var getMaxNumElement = function (num) {
  return Math.max.apply(null, num);
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderSettingsTitle = function (ctx, font, color, shadowData, baseline) {
  var shadowX = shadowData[0];
  var shadowY = shadowData[1];
  var shadowBlur = shadowData[2];

  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = baseline;

  ctx.shadowColor = color;
  ctx.shadowOffsetX = shadowX;
  ctx.shadowOffsetY = shadowY;
  ctx.shadowBlur = shadowBlur;
}

var renderText = function (ctx, text, left, top) {
  var words = text.split(' ');
  var countWords = words.length;
  var line = '';

  for (var i = 0; i < countWords; i++) {
    var testLine = line + words[i] + ' ';
    var testWidth = ctx.measureText(testLine).width;

    if (testWidth > MAX_WIDTH_TEXT) {
      ctx.fillText(line, left, top);
      line = words[i] + ' ';
      top += FONT_GAP;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, left, top);
}

var renderHistogram = function (ctx, player, i, times) {
  var currentPlayerTime = Math.round(times[i]);
  var startPointX = CLOUD_X + BAR_INDENT + (BAR_WIDTH + BAR_INDENT) * i;
  var currentHeightBar = (BAR_HEIGHT * times[i] / getMaxNumElement(times));

  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#000';
  ctx.fillText(player, startPointX, START_POINT_Y);
  ctx.fillText(currentPlayerTime.toString(), startPointX, START_POINT_Y - BAR_GAP_Y - currentHeightBar - FONT_GAP);

  ctx.fillStyle = (player === 'Вы') ? BAR_PLAYER_COLOR : setRandomSaturationColor(BAR_MAIN_COLOR);
  ctx.fillRect(startPointX, START_POINT_Y - BAR_GAP_Y, BAR_WIDTH, -currentHeightBar);
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_SHADOW_GAP, CLOUD_Y + CLOUD_SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderSettingsTitle(ctx, 'PT Mono 16px', '#678afe', [5, 5, 5], 'hanging');

  renderText(ctx, 'Ура вы победили! Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);

  for (var i = 0; i < names.length; i++) {
    renderHistogram(ctx, names[i], i, times)
  }
}
