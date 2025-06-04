(function () {
    var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

    for (var i = 0; i < names.length; i++) {
        var firstLetter = names[i].charAt(0).toLowerCase();

        if (firstLetter === 'j') {
            speakGoodBye.speak(names[i]);
        } else {
            speakHello.speak(names[i]);
        }
    }

    console.log("\nNames with more vowels than consonants:");
    names.forEach(function (name) {
        var vowels = "aeiou";
        var vowelCount = 0;
        var consonantCount = 0;

        for (var i = 0; i < name.length; i++) {
            var ch = name.charAt(i).toLowerCase();
            if (vowels.includes(ch)) {
                vowelCount++;
            } else if (/[a-z]/.test(ch)) {
                consonantCount++;
            }
        }

        if (vowelCount > consonantCount) {
            console.log(name + " (Vowels: " + vowelCount + ", Consonants: " + consonantCount + ")");
        }
    });
})();
