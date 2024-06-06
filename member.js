function skillsMember() {
  // Get the member's skills
  var memberSkills = [];
  for (var i = 0; i < 5; i++) {
    var skill = document.getElementById("skill_" + i);
    if (skill) {
      memberSkills.push(skill.value);
    }
  }
  return memberSkills;
}