import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { World } from "./backend.js";

import tick from './audio/tick.mp3';
const tickSound = new Audio();
tickSound.src = tick;

import siren from './audio/siren.mp3';
const sirenSound = new Audio();
sirenSound.src = siren;

import tada from './audio/tada.mp3';
const tadaSound = new Audio();
tadaSound.src = tada;

import sad from './audio/sad.mp3';
const sadSound = new Audio();
sadSound.src = sad;

$(document).ready(function(){
  $("#startGame").click(function(){

    let earth = new World();
    earth.addCities();
    earth.randomContamination();
    earth.randomContamination();
    earth.infectOther();
    let method;
    sirenSound.play();
    $("#startGame").fadeOut(250);
    $(".instructions").fadeOut(250);

    setTimeout(() => {
      $("#vaccinate").slideDown(1000);
    }, 7500);

    setTimeout(() => {
      $("#treat").slideDown(500);
    }, 15000);

    // AUDIO TICK
    let tick = setInterval(() => {
      tickSound.play();
    }, 1000);



    setInterval(() => {
      for (let i = 0; i < 25; i++) {
        if (earth.cities[i].contamination < 0) {
          $(".contamination" + i).text("0");
        } else {
          $(".contamination" + i).text(earth.cities[i].contamination);
        }
      }
    }, 100);


    setInterval(() => {

      for (let i = 0; i < 25; i++) {
        if (earth.cities[i].contamination > 9) {
          // let id = $(this).attr('id');
          $("#"+i).addClass("infected3");
        } else if (earth.cities[i].contamination > 5) {
          $("#"+i).addClass("infected2");
        } else if (earth.cities[i].contamination > 1) {
          $("#"+i).addClass("infected1");
        }
        else {
          $("#"+i).removeClass("infected3 infected2 infected1");
        }
      }
    }, 101);


    let winCondition = setInterval(() => {
      if (earth.results() === "You cured the planet!") {
        $("#results").text(earth.results());
        clearInterval(tick);
        tadaSound.play();
        clearInterval(winCondition);
        $("#newGame").slideDown(3000);
      }
      else if (earth.results() === "The world is doomed.") {
        $("#results").text(earth.results());
        clearInterval(tick);
        sadSound.play();
        clearInterval(winCondition);
        $("#newGame").slideDown(3000);
      }
    },100);


    $("#vaccinate").click(function() {
      method = "vaccinate";
      $("#treat").removeClass("btn-success");
      $("#treat").addClass("btn-secondary");
      $("#vaccinate").removeClass("btn-secondary");
      $("#vaccinate").addClass("btn-success");
    });

    $("#treat").click(function() {
      method = "treat";
      $("#vaccinate").removeClass("btn-success");
      $("#vaccinate").addClass("btn-secondary");
      $("#treat").removeClass("btn-secondary");
      $("#treat").addClass("btn-success");

    });

    $("td").click(function(){
      if (method === "vaccinate") {
        let id = $(this).attr('id');
        earth.cities[id].vaccinate();

      } else if (method === "treat") {
        let id = $(this).attr('id');
        earth.treat(id);
      }

      // $(this).children().children('.textA').slideToggle();
      // $(this).children().children('.textB').slideToggle();
      // $(this).children().toggleClass("flipped");
    });

  });
});
