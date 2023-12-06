import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import $ from 'jquery'; // Make sure to install jQuery in your project
import '../styles/page-style/TournamentCreate.css';

function CreateTournament() {
  useEffect(() => {
    function floatLabel(inputType) {
      $(inputType).each(function () {
        const $this = $(this);

        // on focus add class active to label
        $this.focus(function () {
          $this.next().addClass('active');
        });

        // on blur check field and remove class if needed
        $this.blur(function () {
          if ($this.val() === '' || $this.val() === 'blank') {
            $this.next().removeClass();
          }
        });
      });
    }

    // just add a class of "floatLabel" to the input field!
    floatLabel('.floatLabel');
  }, []);

  return (

    <form action="" className='createform'>
      <div class="form-group">
        <h2 class="heading">Create A Tournament</h2>
        <div class="controls">
          <input type="text" id="name" class="floatLabel" name="name" />
          <label for="name">Name</label>
        </div>
        <div class="col-1-3 col-1-3-sm">
          <div class="controls">
            <i class="fa fa-sort"></i>
            <select class="floatLabel">
              <option value="blank"></option>
              <option value="1">4</option>
              <option value="2">8</option>
              <option value="3">16</option>
            </select>
            <label for="slots"><i class="fa fa-male"></i>&nbsp;&nbsp;Slots</label>
          </div>
        </div>
        <div class="col-1-3 col-1-3-sm">
          <div class="controls">
            <i class="fa fa-sort"></i>
            <select class="floatLabel">
              <option value="blank"></option>
              <option value="1">1v1</option>
              <option value="2">2v2</option>
              <option value="3">3v3</option>
              <option value="4">4v4</option>
              <option value="5">5v5</option>
              <option value="6">6v6</option>
              <option value="7">7v7</option>
              <option value="8">8v8</option>
              <option value="9">9v9</option>
              <option value="10">10v10</option>
              <option value="11">11v11</option>
            </select>
            <label for="slots"><i class="fa fa-male"></i>&nbsp;&nbsp;Team Size</label>
          </div>
        </div>
        <div class="controls">
          <input type="tel" id="address" class="floatLabel" name="address" />
          <label for="address">Address</label>
        </div>
        <div class="grid">
          <div class="col-2-3">
            <div class="controls">
              <input type="text" id="prize" class="floatLabel" name="prize" />
              <label for="prize">Prize</label>
            </div>
          </div>

        </div>
      </div>

      <div class="form-group">
        <h2 class="heading">Information</h2>
        <div class="grid">
          <div class="controls">
            <textarea name="information" class="floatLabel" id="information"></textarea>
            <label for="information">Information </label>
          </div>
          <button type="submit" value="Submit" class="col-1-4">Submit</button>
        </div>
      </div>
    </form>
  );
}

export default CreateTournament;
