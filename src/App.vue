<script src="https://unpkg.com/vue"></script>
<template>
  <div id="app">
    <div class="inputBox">
      <div>
        <label class="lbl">Zu Zahlen </label>
        <input
          class="currencyInput"
          @click="onSelected()"
          value="€  00,00"
          type="text"
          id="toPay"
          ref="toPay"
          name="toPay"
          autofocus
          readonly
        />
      </div>
      <hr />
      <div>
        <label class="lbl">Gegeben</label>
        <input
          class="currencyInput"
          @click="onSelected()"
          value="€  00,00"
          type="text"
          id="toGet"
          ref="toGet"
          name="toGet"
          readOnly 
        />
      </div>
    </div>
    <div style="margin-top: 117px">
      <ul>
        <li><a class="active">Bar</a></li>
        <li><a>Ec</a></li>
        <li><a>Kredikart</a></li>
        <li><a>Gutschein</a></li>
      </ul>
    </div>
    <div class="cal">
      <div class="button-calc">
        <div class="row">
          <div class="column" style="background-color: #aaa">
            <input
              class="mybutton"
              type="button"
              @click="setButtonVal('Suggestion5')"
              id="Suggestion5"
              ref="Suggestion5"
              value="0"
            />
          </div>
          <div class="column" style="background-color: #bbb">
            <input
              class="mybutton"
              type="button"
              @click="setButtonVal('Suggestion4')"
              id="Suggestion4"
              ref="Suggestion4"
              value="0"
            />
          </div>
          <div class="column" style="background-color: #bbb">
            <input
              class="mybutton"
              type="button"
              @click="setButtonVal('Suggestion3')"
              id="Suggestion3"
              ref="Suggestion3"
              value="0"
            />
          </div>
          <div class="column" style="background-color: #bbb">
            <input
              class="mybutton"
              type="button"
              @click="setButtonVal('Suggestion2')"
              id="Suggestion2"
              ref="Suggestion2"
              value="0"
            />
          </div>
          <div class="column" style="background-color: #bbb">
            <input
              class="mybutton"
              type="button"
              @click="setButtonVal('Suggestion1')"
              id="Suggestion1"
              ref="Suggestion1"
              value="0"
            />
          </div>
        </div>
      </div>

      <div class="calcContainer" style="background: grey; margin: 150px auto">
        <div class="button-grid" style="background: grey">
          <button
            v-for="button in buttons"
            :key="button"
            @click="handleButtonClick(button)"
            class="calc-button"
            ref="buttonRef"
            :class="{ 'two-span': button === 'C' }"
          >
            {{ button }}
          </button>
        </div>
        <div
          class="column 1"
          style="
            float: left;
            margin-top: -37px;
            margin-left: 320px;
            text-align: center;
          "
        >
          <button class="zahlen" id="show-modal" @click="calculate()">
            Zahlen
          </button>
        </div>
      </div>
    </div>
    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title" style="color: cyan; font-size: 25px">
                    Zurückzahlen
                  </h4>
                </div>
                <div class="modal-body">
                  <label style="color: cyan; font-size: 66px"
                    >{{ this.$root.Out }}
                  </label>
                </div>
              </div>
              <button type="button" class="zahlen" @click="toCloseModel()">
                Close
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script >
/*eslint-disable*/
const buttons = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "<-", "0", "C"];
const Curtyp = ["1", "5", "10", "50", "100"];
export default {
  name: "Cashier",
  data: function () {
    return {
      showModal: false,
      selectedfield: "toPay",
    };
  },
  setup() {
    function handleButtonClick(val) {
      if (
        this.$root.selectedfield !== "toPay" &&
        this.$root.selectedfield !== "toGet"
      ) {
        this.$root.selectedfield = "toPay";
      }

      if (val === "C") {
        this.$refs.toPay.value = "€  00,00";
        this.$refs.toGet.value = "€  00,00";
        this.$refs.Suggestion1.value = 0;
        this.$refs.Suggestion2.value = 0;
        this.$refs.Suggestion3.value = 0;
        this.$refs.Suggestion4.value = 0;
        this.$refs.Suggestion5.value = 0;
        this.$root.selectedfield = "toPay";
        return;
      }
    
      var thousand = 0;
      var str = this.$refs[this.$root.selectedfield].value;
      str = str.replace("€  ", "");
      str = str.replace(",", "");
      str = str.replace(".", "");
      if (val === "<-") { 
        str = str.substring(0, str.length - 1);
       }
      else{
        str = str + val;
      }
      
      str = Number(str);
      if (str > 100000) {
        return;
      }
      str = Number(str).toString();

      var toSelectString = "" + str;
      while (toSelectString.length < 4) {
        toSelectString = "0" + toSelectString;
      }
      var toCalcStr = toSelectString.length - 2;
      var firstString = toSelectString.substring(0, toCalcStr);
      var lastString = toSelectString.substring(
        toCalcStr,
        toSelectString.length
      );
      toSelectString = firstString + "," + lastString;

      str = toSelectString.replace(",", "");
      str = Number(str).toString();
      if (str.length > 5) {
        var toCalcStr = str.length - 5;
        firstString = str.substring(0, toCalcStr);
        lastString = str.substring(toCalcStr, str.length);
        toSelectString = firstString + "." + lastString;

        var toCalcStr = toSelectString.length - 2;
        firstString = toSelectString.substring(0, toCalcStr);
        lastString = toSelectString.substring(toCalcStr, toSelectString.length);
        toSelectString = firstString + "," + lastString;
        
      }
      toSelectString = "€  " + toSelectString ;
      this.$refs[this.$root.selectedfield].value = toSelectString;
      this.onChange();
    }
    function toCloseModel() {
      this.showModal = false;
      this.handleButtonClick("C");
    }

    function onSelected() {
      this.$root.selectedfield = document.activeElement.id;
    }
    function setButtonVal(button) {
      this.$refs.toGet.value = "€  " + this.$refs[button].value;
    }

    function calculate() {
      
        var amtReturn = 0.00;

        var CustomeBill=this.$refs.toPay.value;
        var CustomeGave=this.$refs.toGet.value;
        CustomeGave= CustomeGave.toString().replace("€  ","");
        CustomeBill= CustomeBill.toString().replace("€  ","");
        CustomeGave= CustomeGave.toString().replace(".","");
        CustomeBill= CustomeBill.toString().replace(".","");
        CustomeGave= CustomeGave.toString().replace(",",".");
        CustomeBill= CustomeBill.toString().replace(",",".");
        amtReturn = (CustomeGave - CustomeBill).toFixed(2);   
        amtReturn =  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amtReturn);
        this.$root.Out = amtReturn;
        this.showModal = true;
    }

    function onChange() {
      var amount = 0;
    
      this.$root.ToBePaid = this.$refs.toPay.value;
      this.$root.ToBePaid = this.$root.ToBePaid.replace("€  ", "");
      this.$refs.Suggestion1.value = this.$root.ToBePaid;

      var ValIn = 0;
      var ValOut = 0;

      ValIn = this.$root.ToBePaid;
      ValIn = ValIn.replace("€  ", "");
      ValIn = ValIn.replace(".", "");
      ValIn = ValIn.replace(",", ".");

      if (ValIn <= 0) {
        return;
      }
      this.$root.Out = ValIn;
      for (var i = 2; i <= 5; i++) 
      {
        this.toGetCurrencyMulti(this.$root.Out);
        this.setSuggestion('Suggestion' + i,this.$root.Out);
      }
    }
    function setSuggestion(but, val) {
      val = val.toLocaleString("de-DE", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
      this.$refs[but].value = val;
    }
    function toGetCurrencyMulti(amount1) {
      var temp = 0.0;
      var amount = 0.0;
      amount = amount1;
      for (var i = 0; i < 5; i++) 
      {
        this.getCloseRoundOff(Curtyp[i])
        temp = this.$root.Out;
       if (amount < temp) {
        this.$root.Out = temp;
        return;
       }
      }
     
      this.getCloseRoundOff(100);
      temp = this.$root.Out;
      if (amount < temp) {
        this.$root.Out = temp;
        return;
      } else {
        amount = parseFloat(amount) + parseFloat(100);
        this.$root.Out = amount;
        return;
      }
    }

    function getCloseRoundOff(value) {
      var temp = 0.0;
      var MultiFloat = 0.0;
        
      if (value <= 0) {
        return;
      }
      var toBepaidValue = this.$root.ToBePaid;
      toBepaidValue = toBepaidValue.replace("€  ", "");
      toBepaidValue = toBepaidValue.replace(".", "");
      toBepaidValue = toBepaidValue.replace(",", ".");
      var nemo = parseFloat(toBepaidValue);
      if (nemo <= 0.00) {
        return;
      }
      var deno = parseFloat(value);
      temp = nemo / deno;
      temp = Math.ceil(temp);
      MultiFloat = temp * value;
      this.$root.Out = MultiFloat;
    }


    return {
      buttons,
      handleButtonClick,
      onSelected,
      setSuggestion,
      onChange,
      setButtonVal,
      toGetCurrencyMulti,
      getCloseRoundOff,
      calculate,
      toCloseModel,
    };
  },
};
</script>

<style>
/*eslint-disable*/
body {
  background-color: lightgray;
}
.calcContainer {
  max-width: 320px;
  margin: 0 auto;
  border: 2px solid #555555;
  border-radius: 4px;
  box-sizing: border-box;
}
ul {
  list-style-type: none;
  background-color: grey;
  display: block;
}
li {
  float: left;
  border: 2px solid lightgray;
}
li a {
  padding: 14px 55px;
  background-color: grey;
}
.mybutton {
  background-color: #555555;
  color: white;
  padding: 23px 50px;
  padding-left: 55px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border: 2px solid black;
  width: 250px;
  height: 55px;
}
.zahlen {
  background-color: cornflowerblue;
  width: 75px;
  text-align: center;
  border: 2px solid white;
  padding: 7px;
  margin-left: 100px;
  width: 145px;
}
.cal {
  background: black;
  height: 280px;
}

.inputBox {
  margin-top: 5%;
  background-color: white;
  width: 50%;
  margin-left: 25%;
  text-align: left;
  color: none;
}
.inputBox :hover {
  border-style: none;
}
.currencyInput {
  border-style: none;
  font-size: 34px;
  outline: none;
  text-align: center;
}
.currencyInput:focus {
  text-decoration-color: cyan;
  text-decoration-line: underline;
  text-decoration-style: double;
}
.button-grid {
  display: grid;
  padding: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
}

.button-calc {
  float: left;
  margin-left: 15%;
}
.calc-button {
  padding: 10px;
  font-size: 22px;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  border-radius: 2px;
  border: 0;
  outline: none;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;
}

.calc-button:hover {
  opacity: 1;
}

.calc-button:active {
  background: #999;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  border: 3px solid cyan;
  padding: 14px;
  margin: 15px;
  top: 160px;
  left: 30%;
  width: 34%;
  height: 20%;
  background-color: rgba(0, 0, 0, 0.9);
  display: table;
  text-align: center;
}
.lbl{  
    width: 100px;
    height: 29px;
    cursor: pointer;  
    position: relative;  
    display: block;
    float: left;
    line-height: 29px;
    margin-left: 20px;
}
</style>
