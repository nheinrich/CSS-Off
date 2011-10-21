$(function(){
  k.obstacles.init()
  k.scroll.init();
})

// knucklelodeon -------------------------------------------------------------

// namespace
var k = {};

// obstacles
k.obstacles = {
  init: function(){
    this.element = $("#obstacles")
    this.links = this.element.find("a")
    this.links.click(function(){ k.obstacles.show($(this)) })
    $(this.links[this.random_obstacle()]).click()
  },
  random_obstacle: function(){
    return Math.floor(Math.random() * this.links.length)
  },
  show: function($link){
    var $obstacle = this.element.find("#obstacle");
    $obstacle.find("h1").html($link.html());
    $obstacle.find("h2").html($link.attr("title"));
    var image_url = "images/obstacles/";
    var src = image_url + $link.attr("href").replace("#","") + ".png";
    $obstacle.find("img").attr("src", src);
    this.element.find(".selected").removeClass("selected");
    $link.closest("li").addClass("selected");
  }
}

// navigation opacity change when not at scrollTop
k.scroll = {
  init: function(){
    $(document).scroll(function(){
      // nav
      if ($(this).scrollTop() > 0) {
        $("body > nav").addClass("scrolling");
      } else {
        $("body > nav").removeClass("scrolling");
      }
      // timer
      if (($(this).scrollTop() > 2250) && k.timer.timing != true) {
        k.timer.init();
      }
    })
  }
};

// timer
k.timer = {
  init: function(){
    this.element = $("#timer")
    this.current_number = parseInt(this.element.html())
    this.countdown()
    this.timing = true
  },
  countdown: function(){
    var num = this.current_number;
    if (num > 0) {
      if (num.toString().length == 1) {
        num = "0" + num.toString();
      }
      this.element.html(num);
      this.current_number -= 1
      setTimeout(function(){ k.timer.countdown() }, 1000);
    } else {
      this.element.html("00");
      $("#register aside span").html("Times Up!<br/>(Just Kidding)")
    }
  }
};