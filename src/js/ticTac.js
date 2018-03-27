const markedSquares = [],
textToNumber = {'one': 1,'two': 2,'three': 3,'four': 4,'five': 5,'six': 6,'seven': 7,'eight': 8,'nine': 9},
numberToText = {1: 'one',2: 'two',3: 'three',4: 'four',5: 'five',6: 'six',7: 'seven',8: 'eight',9: 'nine'},
winningCombos = [
   [1,2,3], [1,4,7], [2,5,8], [3,6,9], [4,5,6], [1,5,9], [3,5,7], [7,8,9]
], corners = [1, 3, 7, 9], markedWithX = [], markedWith0 = [];

let level;
function deleteArrEle(arr, ele) {
   let newArr = arr;
   arr = [];
   newArr.forEach(item => {
      if (Array.isArray(ele)) {
         if (ele.indexOf(item) === -1) {
            arr.push(item)
         }
      } else if (item !== ele) {
         arr.push(item)
      }
   });
   return arr;
}

function getPossibleWin() {
   // console.log('markedWith0: ', markedWith0);
   const promises = [];

   remainedEles = []
   winningCombos.forEach(arr => {
      promises.push(
         new Promise(res => {
            let matched = [], remainedEle;
            arr.forEach(i => {
               if (markedWith0.indexOf(i) > -1) {
                  matched.push(i);
               } else {
                  remainedEle = i;
               }
            });
            if (matched.length === 2 && markedSquares.indexOf(remainedEle) === -1) {
               // console.log('remainedEle: ', remainedEle)
               res(remainedEle);
            } else {
               res('')
            }
         })
      )


   });
   return Promise.all(promises).then(ele => {
      // console.log('ele: ', ele)
      return ele.filter(e => {
         return e !== '';
      });
   });
}

function getPossibleDefence(selectedSquare) {
   // console.log('selectedSquare: ', selectedSquare);
   let possibleWins = [], toDefend = [], ran;
   winningCombos.forEach(arr => {
      let mayWin = [], leftOut;
      arr.forEach(item => {
         if(markedWithX.indexOf(item) > -1) {
            mayWin.push(item);
         }
         else {
            leftOut = item;
         }
      });
      // console.log('mayWin: ', mayWin)
      if (mayWin.length > 1) {
         possibleWins.push(leftOut);
      }
   });

   winningCombos.forEach(arr => {
      if (arr.indexOf(selectedSquare) > -1) {
         arr.forEach(item => {
            if (
               toDefend.indexOf(item) == -1 &&
               markedSquares.indexOf(item) == -1
            ) {
               toDefend.push(item);
            }
         });
      }
   });
   // console.log('toDefend1 ', toDefend);
   possibleWins = deleteArrEle(possibleWins, markedSquares);

   if (possibleWins.length > 0) {
      toDefend = possibleWins;
   } else {
      winningCombos.forEach(arr => {
         let mayWin = [], leftOut;
         // console.log('markedWith0: ', markedWith0)
         arr.forEach(item => {
            if(markedWith0.indexOf(item) > -1) {
               mayWin.push(item);
            }
            else {
               // console.log(item)
               leftOut = item;
            }
         });
         if (mayWin.length > 1) {
            possibleWins.push(leftOut);
         }
      });
   }
   if (possibleWins.length === 0) {
      possibleWins = toDefend;
   }
   possibleWins = deleteArrEle(possibleWins, markedSquares);
   // console.log('possibleWins ', possibleWins)
   // console.log('toDefend ', toDefend)

   if (possibleWins.length === 0) {
      possibleWins = toDefend;
   }

   ran = possibleWins[Math.floor(Math.random()*possibleWins.length)]

   // markedSquares.push(ran);
   // console.log('markedSquares ', markedSquares);
   // console.log('ran: ', ran)
   return ran;

}

function getQueryParams() {
   let vars = {},
   parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
   (m,key,value) => {
      vars[key] = value;
   });
   // console.log(vars)
   return vars
}

function validateForm() {
   // console.log('validateFormS')
   let x = document.forms["myForm"]["uname"].value;
   x = x.replace(/\s/, '');
   document.forms["myForm"]["uname"].value = x;
   // console.log('x ', x)
   // return false;
   if (x) {
      return true;
   } else {
      alert('Please choose a username');
      return false;
   }

}

function refreshPage() {
   location.reload();
}

function declareWinner(winner) {
   setTimeout(() => {
      alert(winner + ' won');
      // console.log('some');
      location.reload();
   }, 500)
   //$('td').unbind("click");
}

(function setProfile() {
   let params = getQueryParams();
   level = params.level;
   let h = $('<h2>'+params.uname+'</h2>');

   if(params.uname && params.uname.length > 10) {
      h = $('<h2 title='+params.uname+'>'+params.uname.slice(0,7)+'...</h2>');
   }

   let p = $('<p>'+level+'</p>')

   $(document.getElementById('uname')).append(h)
   $(document.getElementById('level')).append(p);
})();

function handlePromise (res) {
   let arr = this;
   const wonX = [], won0 = [];
   arr.forEach(i => {
      if (markedWithX.indexOf(i) > -1) {
         wonX.push(i)
      }
      if (markedWith0.indexOf(i) > -1) {
         won0.push(i)
      }
   });
   if (wonX.length === 3) {
      res('X');
   }
   if(won0.length === 3) {
      res('0');
   }
   else {
      res('')
   }
}

function checkForWin() {
   const promises = [];
   winningCombos.forEach(arr => {
      // console.log('arr: ', arr)
      promises.push(
         new Promise(handlePromise.bind(arr))
      );
   });
   return Promise.all(promises).then(s => {
      return s;
   })
}

function getSquareFor0(selectedSquare) {

   return new Promise(async (res) => {
      let squareFor0;
      if (markedWithX.length === 1 && parseInt(level) > 1) {
         // squareToMark0 = $('td:empty').attr('id');
         if (corners.indexOf(selectedSquare) > -1) {
            squareFor0 = 'five'
         } else {
            let allEmpty = $('td:empty');
            let randomEmpty = allEmpty[Math.floor(Math.random()*allEmpty.length)]
            squareFor0 = $(randomEmpty).attr('id');
            // console.log('d', )
         }
         // console.log('squareFor0' , squareFor0)
      } else {
         const possibleWin0 = await getPossibleWin();
         // console.log('possibleWin0: ', possibleWin0)
         // console.log(typeof level)
         if (possibleWin0.length > 0 && (parseInt(level) > 1 || Math.random() < 0.5)) {
            console.log('level: ', level)
            squareFor0 = numberToText[possibleWin0[0]];
         } else {
            squareFor0 = numberToText[getPossibleDefence(selectedSquare)];
            // console.log('squareFor0: ', squareFor0)
         }
      }
      // console.log('return now: ',squareFor0)
      res(squareFor0);
   });
}

async function markSquareFor0(squareToMark0) {
   console.log('squareToMark0' , squareToMark0);
   if (squareToMark0 === undefined) {
      setTimeout(() => {
         alert('Match drawn');
         // console.log('some');
         location.reload();
      }, 500)
      //location.reload();
   }
   let toSelect = $(document.getElementById(squareToMark0));

   // console.log('toSelect', toSelect)
   toSelect.css('color', 'green')
   $(toSelect).text('0');
   markedWith0.push(textToNumber[squareToMark0]);
   markedSquares.push(textToNumber[squareToMark0]);

   if (markedWith0.length > 2) {
      wins = await checkForWin();

      // console.log(s);
      if (wins.indexOf('0') > -1) {
         declareWinner('0');
      }
   }

   $(toSelect).unbind("click");
}

$("td").click(async function(){
   let squareToMark0, wins,
   selectedSquare = textToNumber[this.id];

   markedSquares.push(textToNumber[this.id]);
   markedWithX.push(textToNumber[this.id]);
   // let div = document.createElement('div');
   // $(div).text('X')
   // $(this).append($(div));
   // $(this).attr('id', 'marked');
   $(this).text('X');
   $(this).css('color', 'red');
   $(this).unbind("click");

   if (markedWithX.length > 2) {
      wins = await checkForWin();

      // console.log(s);
      if (wins.indexOf('X') > -1) {
         declareWinner('X');
         return;
      }
   }

   getSquareFor0(selectedSquare).then(markSquareFor0);

});
