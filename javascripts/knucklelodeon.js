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
    // store common elements
    this.$element = $("#obstacles")
    this.$links = this.$element.find("a")

    // add click event to links
    this.$links.click(function(){ k.obstacles.show($(this)) })

    // load random obstacle
    $(this.$links[this.random_obstacle()]).click()
  },
  random_obstacle: function(){
    // grabs a random obstacle based on number links
    return Math.floor(Math.random() * this.$links.length)
  },
  show: function($link){
    var $obstacle = this.$element.find("#obstacle");
    var image_url = "images/obstacles/";
    var name = $link.attr("href").replace("#","")
    var src = image_url + name + ".png";

    // remove current selection on link list
    this.$element.find(".selected").removeClass("selected");

    // load new image
    $obstacle.find("img").fadeOut(function(){
      // add descriptive class to #obstacle element
      // note: this can shift the image due to styling so this is done here
      $obstacle.attr("class","").addClass(name)
      // alter src
      $(this).attr("src", src).fadeIn();
    })

    // populate h1
    $obstacle.find("h1").fadeOut(function(){
      $(this).html($link.html()).fadeIn();
    })

    // populate h2
    $obstacle.find("h2").fadeOut(function(){
      $(this).html($link.attr("title")).fadeIn();
    })

    // set new selection on link list
    $link.closest("li").addClass("selected");
  }
}


// navigation opacity change when not at scrollTop
k.scroll = {
  init: function(){
    $(document).scroll(function(){
      var scroll_top = $(this).scrollTop()

      // nav
      if (scroll_top > 0) {
        $("body > nav").addClass("scrolling");
      } else {
        $("body > nav").removeClass("scrolling");
      }

      // timer
      if (scroll_top > 2250 && k.timer.timing != true) {
        k.timer.init();
      }
    })
  }
};


// timer
k.timer = {
  init: function(){
    this.$element = $("#timer")
    this.current_number = parseInt(this.$element.html())
    this.countdown()
    this.timing = true
  },
  countdown: function(){
    var num = this.current_number;
    if (num > 0) {
      if (num.toString().length == 1) {
        num = "0" + num.toString();
      }
      this.$element.html(num);
      this.current_number -= 1
      setTimeout(function(){ k.timer.countdown() }, 1000);
    } else {
      this.$element.html("00");
      $("#register aside span").html("Times Up!<br/>(Just Kidding)")
    }
  }
};