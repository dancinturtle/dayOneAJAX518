var score = 0;
var answered = 0;
var active_question = false;

function makeForm(question) {
    var str = "<div><p>" + question.results[0].question + "</p>";
    var ans = [];
    for(var i=0; i<question.results[0].incorrect_answers.length; i++) {
        ans.push("<p class='answer'>" + question.results[0].incorrect_answers[i] + "</p>")
    }
    ans.splice(Math.floor(Math.random() * ans.length), 0, "<p class='correct answer'>" + question.results[0].correct_answer + "</p>");
    for(i=0; i<ans.length; i++) {
        str += ans[i];
    }
    str += "</div>"
    return str;
}
function resetQuestions() {
    $("#continue").text("");
    $(".question").removeClass("answered");
    $(".question").children().show();
    return false;
}
$(document).ready(function(){
    $(document).on("click", ".answer", function(e){
        e.stopPropagation();
        if($(this).hasClass("correct")) {
            score += parseInt($(this).parent().parent().attr("points"));
            $("#score").text(score);
        }
        $(this).parent().parent().addClass("answered");
        $(this).parent().remove();
        answered++;
        active_question = false;
        if(answered >= 9) {
            answered = 0;
            $("#continue").html("<a href='#'>Continue with new question</a>");
            $("a").click(resetQuestions);
        }
    });
    $(".question").click(function(){
        if(!active_question && !$(this).hasClass("answered")) {
            active_question = true;
            this_question = $(this);
            $.get("https://opentdb.com/api.php?amount=1&category="+$(this).attr("category")+"&difficulty="+$(this).attr("difficulty")+"&type=multiple", function(res){
                this_question.children().hide();
                this_question.append(makeForm(res));
            });
        }
    })
});