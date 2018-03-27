var markedSquares = [],
textToNumber = {'one': 1,'two': 2,'three': 3,'four': 4,'five': 5,'six': 6,'seven': 7,'eight': 8,'nine': 9},
numberToText = {1: 'one',2: 'two',3: 'three',4: 'four',5: 'five',6: 'six',7: 'seven',8: 'eight',9: 'nine'},
winningCombos = [
   [1,2,3], [1,4,7], [2,5,8], [3,6,9], [4,5,6], [1,5,9], [3,5,7], [7,8,9]
], empty, corners = [1, 3, 7, 9], markedWithX = [], markedWith0 = [];

function deleteArrEle(arr, ele) {
   var newArr = arr;
   arr = [];
   newArr.forEach(function(item) {
      if (Array.isArray(ele)) {
         if (ele.indexOf(item) === -1) {
            arr.push(item)
         }
      } else if (item !== ele) {
         arr.push(item)
      }
   });
   return arr
}

function getPossibleWin(cb) {
   // console.log('markedWith0: ', markedWith0);
   remainedEles = []
   winningCombos.forEach(function(arr) {
      var matched = [], remainedEle;
      arr.forEach(function(i) {
         if (markedWith0.indexOf(i) > -1) {
            matched.push(i);
         } else {
            remainedEle = i;
         }
      });
      if (matched.length === 2 && markedSquares.indexOf(remainedEle) === -1) {
         // console.log('remainedEle: ', remainedEle)
         remainedEles.push(remainedEle);
      }
   });
   cb(remainedEles[0]);
}

function getPossibleDefence(selectedSquare) {
   // console.log('selectedSquare: ', selectedSquare);
   var possibleWins = [], toDefend = [], ran;
   winningCombos.forEach(function(arr) {
      var mayWin = [], leftOut;
      arr.forEach(function(item) {
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

   winningCombos.forEach(function(arr) {
      if (arr.indexOf(selectedSquare) > -1) {
         arr.forEach(function(item) {
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
      winningCombos.forEach(function(arr) {
         var mayWin = [], leftOut;
         // console.log('markedWith0: ', markedWith0)
         arr.forEach(function(item) {
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
   var vars = {};
   var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
   });
   // console.log(vars)
   return vars
}

function validateForm() {

   var x = document.forms["myForm"]["uname"].value;
   console.log('x ', x)
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
   setTimeout(function(){
      alert(winner + ' won');
      console.log('some');
      location.reload();
   }, 500)
   $('td').unbind("click");
}

$(function(){
   var params = getQueryParams();
   // if(!params.uname && !params.level) {
   //    alert('Please Enter name and level');
   //    return;
   // }
   var h = $('<h2>'+params.uname+'</h2>');

   if(params.uname && params.uname.length > 10) {
      h = $('<h2 title='+params.uname+'>'+params.uname.slice(0,7)+'...</h2>');
   }

   var p = $('<p>'+params.level+'</p>')

   $(document.getElementById('uname')).append(h)
   $(document.getElementById('level')).append(p);

   $("td").click(function(){
      // console.log('this" ', this)
      $(this).css('color', 'red');
      markedSquares.push(textToNumber[this.id]);
      markedWithX.push(textToNumber[this.id]);
      // var div = document.createElement('div');
      // $(div).text('X')
      // $(this).append($(div));
      // $(this).attr('id', 'marked');
      $(this).text('X');
      $(this).unbind("click");

      var won
      winningCombos.forEach(function(arr) {
         var wonX = [];
         arr.forEach(function(i) {
            if (markedWithX.indexOf(i) > -1) {
               wonX.push(i)
            }

         });
         if (wonX.length === 3) {
            won = wonX;
            // return;
         }

      });
      if (won) {
         declareWinner('X');
         // console.log('X won: ', won);
         // won.forEach(function(i) {
         //    $(document.getElementById(numberToText[i])).text('X').addClass('winner')
         // })
         // $('td').slideDown();

         return;
      }

      // console.log('clicked ', this.id);
      var squareToMark0, selectedSquare = textToNumber[this.id];
      // console.log('selectedSquare: ', selectedSquare)
      if (markedWithX.length === 1) {
         // squareToMark0 = $('td:empty').attr('id');
         if (corners.indexOf(selectedSquare) > -1) {
            squareToMark0 = 'five'
         } else {
            squareToMark0 = $('td:empty').attr('id');
            var ss = $('tbody:empty').attr('id');
            // console.log('d', ss)
         }
         // console.log('squareToMark0' , squareToMark0)
         var toSelect = $(document.getElementById(squareToMark0));

         // console.log('toSelect', toSelect)
         toSelect.css('color', 'green')
         $(toSelect).text('0');
         markedWith0.push(textToNumber[squareToMark0]);
         markedSquares.push(textToNumber[squareToMark0])
         // $(toSelect).attr('id', 'marked');
         $(toSelect).unbind("click");
      } else {
         getPossibleWin(function(ele) {
            var t;
            if(ele) {
               // console.log('sdrfsd ', ele)
               squareToMark0 = numberToText[ele]
            } else {
               // console.log('this.id: ', this.id)
               squareToMark0 = numberToText[getPossibleDefence(selectedSquare)];
               var xxx=[];
               markedWithX.forEach(function(i) {
                  if(corners.indexOf(i) > -1) {
                     xxx.push(i)
                  }
               });

               if(xxx.length >= 2) {
                  // console.log('xxx: ', xxx, xxx.length)
                  // hard logic goes here
               }
               // squareToMark0 = ()
            }
            // console.log('squareToMark0' , squareToMark0)
            var toSelect = $(document.getElementById(squareToMark0));

            // console.log('toSelect', toSelect)
            toSelect.css('color', 'green')
            $(toSelect).text('0');
            markedWith0.push(textToNumber[squareToMark0]);
            markedSquares.push(textToNumber[squareToMark0])
            // $(toSelect).attr('id', 'marked');
            winningCombos.forEach(function(arr) {
               var won0 = [];
               arr.forEach(function(i) {

                  if (markedWith0.indexOf(i) > -1) {
                     won0.push(i)
                  }
               });

               if (won0.length === 3) {
                  // console.log('0 won');

                  declareWinner('0');
                  // return;
               }
            });
            $(toSelect).unbind("click");
         });
      }
   });
});
