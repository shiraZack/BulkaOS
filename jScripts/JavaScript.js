// משתנים גלובליים – נשמור בהם את הבחירות של המשתמש כדי שנוכל להשתמש בהן בכל הפונקציות
let selectedFlavor = "";      // הטעם שנבחר, "מתוק" או "מלוח" - יש רק אופציה אחת
let selectedPastry = "";      // סוג המאפה שנבחר - יש רק אופציה אחת
let selectedFilling = "";     // סוג המילוי שנבחר - יש רק אופציה אחת
let selectedTopping = [];     //מערך שמכיל את כל התוספות שנבחרו - יכולה להיות יותר מאופציה אחת 

function pickFlavor() { // פונקציה לטיפול בבחירת טעם (״מתוק״ או ״מלוח״)
    const flavors = document.getElementsByName("flavor");  
    // בוחר את כל האלמנטים ב-HTML שיש להם את המחלקה "flavor" בName – במקרה הזה אלה כפתורי רדיו של הטעמים (מתוק/מלוח)
    selectedFlavor = ""; // איפוס הבחירה הנוכחית כדי לבדוק מחדש (רק למקרה שהמשתמש משנה בחירה)
    for (let i = 0; i < flavors.length; i++) { // לולאה שעוברת על כל האפשרויות של הטעם
        const formDiv = document.getElementById(flavors[i].id + "Form");  
        // משתנה שבוחר את האלמנט של הטופס שמתאים לטעם הזה ("sweetForm" = "sweet"+"Form" או saltyForm)
        if (flavors[i].checked) {  // בודק בסבב הנוכחי אם המשתמש בחר את הרדיו הזה
            selectedFlavor = flavors[i].value; // שמור את הערך של הטעם הנבחר
            formDiv.style.display = "block";   // מציג את הטופס בהתאם לבחירת המשתמש
        } else {
            formDiv.style.display = "none";    // אם לא נבחר – מסתיר את הטופס
        }
    }
}
function pickChoice(type) { 
    // פונקציה אחידה שמעבירה פרמטרים שונים לבחירת מאפה, מילוי או תוספות - כפתור אחד שמאגד את כל הבחירות לפונקציה אחת
    const name = selectedFlavor === "מתוק" ? `sweet${type}` : `salty${type}`;
    // קובע את שם המחלקה של האלמנטים שנרצה לבדוק, לפי אם הטעם הוא מתוק או מלוח
    // `salty${type}` – הסימן $ עם המרכאות המסולסלות משמש להכניס משתנה למחרוזת.
    // כאן הוא לוקח את הערך של המשתנה type (שהועבר כפרמטר מה-HTML) ומחבר אותו למחרוזת "salty"
    // לדוגמה, אם type = "Pastry", התוצאה הסופית תהיה "saltyPastry" 
    const elements = document.getElementsByName(name);  
    // בוחר את כל האלמנטים שיש להם Name זהה, לפי המחרוזת שיצרנו שורה מעל
    if (type === "Topping") selectedTopping = [];
    // אם מדובר בתוספות (הפרמטר מהכפתורים בתוספות), תאפס את המערך לפני שמוסיפים/מסירים תוכן
    for (let i = 0; i < elements.length; i++) { // לולאה שעוברת על כל האפשרויות במחלקה שנבחרה
        const img = document.getElementById(elements[i].id + "Img");
// בוחרים את התמונה שמתאימה לכל אפשרות לפי השם המזהה של המוצר (לדוג׳ מאפה-croissant) ומוסיפים את המחרוזת "Img" (זה השם המזהה של התמונה - "croissantImg")
        if (elements[i].checked) {  // אם האפשרות נבחרה
            if (type === "Topping") { // תבדוק אם הסוג הנבחר הוא התוספות
                selectedTopping.push(elements[i].value); // תוסיף למערך את השם של הערך של הפריט הנבחר
                img.style.opacity = 1; // תציג את התמונה במלואה בשקיפות מלאה
            } else { // אחרת (אם לא נבחר, זה כנראה מאפה או מילוי ולא תוספות)
                img.style.display = "block"; // תציג את התמונה של המאפה או המילוי הנבחר
                if (type === "Pastry") selectedPastry = elements[i].value; // אם הסוג הנבחר הוא מאפה, שמור את שם הערך של המאפה שנבחר
                if (type === "Filling") selectedFilling = elements[i].value; // אם הסוג הנבחר הוא מילוי, שמור את שם הערך של המילוי שנבחר
            }
        } else {  // אם האלמנט במיקום הנוכחי לא נבחר
            if (type === "Topping") img.style.opacity = 0.5; // לתוספות תשאיר תמונה חצי שקופה (אלו שלא נבחרו)
            else img.style.display = "none"; // אם אלו לא תוספות (מאפה או מילוי) - תסתיר את התמונות
        }
    }
    activateBtn(); // בסיום, תקרא לפונקציה שבודקת אם אפשר להפעיל כעת את כפתור השליחה
}

function getFormValues() { // פונקציה ששומרת את הערכים הטקסטואליים במשתנים
    const fName = document.getElementById("fName").value.trim();  // בוחר את השם פרטי לפי השם המזהה. trim - מסיר רווחים מיותרים מההתחלה ומהסוף
    const lName = document.getElementById("lName").value.trim();  // מקבל את הערך של שם המשפחה ומסיר רווחים מיותרים
    const notes = document.getElementById("notes").value.trim();  // מקבל את הערות המשתמש ומסיר רווחים מיותרים
    return { fName, lName, notes };  // מחזיר אובייקט עם כל הערכים
    // הסוגריים המסולסלים יוצרים אובייקט – מבנה שמחזיק כמה ערכים יחד עם שמותיהם
    // כאן האובייקט מכיל את השדות fName, lName ו-notes
    // היתרון שאפשר לגשת לכל ערך לפי שמו. למשל values.fName
    // וגם אפשר בהמשך להשתמש ב-destructuring (הפעולה ההפוכה - פירוק המבנה לגורמים) כדי להוציא את הערכים למשתנים נפרדים בקלות
}

function activateBtn() { // פונקציה שמפעילה/מכבה את כפתור השליחה לפי מה שהמשתמש בחר, מופעלת גם ב-onload לצורך איפוס בטעינת העמוד
    const btn = document.getElementById("submitBtn"); // בוחר את כפתור השליחה לפי השם המזהה
    const { fName, lName } = getFormValues();
    // קורא לפונקציה getFormValues() שמחזירה אובייקט עם השדות של הטופס, למשל { fName: "ישראל", lName: "ישראלי" }
    //  עכשיו עושים את הפעולה שהסברנו קודם (destructuring) ומפרקים האובייקט הזה למשתנים נפרדים
    // ויש לנו שני משתנים חדשים בשם fName ו-lName שמכילים את הערכים מהטופס
    // במקום לקחת כל פעם את אותם הערכים בשתי פונקציות נפרדות, אנחנו משתמשים במשתנים האלה ישירות מה שהופך את הקוד ליעיל
    const allSelected = fName.length > 0 && lName.length > 0 && selectedFlavor && selectedPastry && selectedFilling;
    //יצרנו משתנה בשם allSelected שמכיל את כל התנאים לבדיקה – האם המשתמש מילא שם פרטי, שם משפחה, בחר טעם, מאפה ומילוי
    // כדי לא לכתוב את כל התנאים שוב ושוב, אלא לשים אותם במקום אחד ולבדוק בצורה נוחה אם הכל נכון
    btn.disabled = !allSelected;
    // הסימן ! אומר "לא" – כלומר אם הכל לא מלא אז כפתור השליחה יהיה מושבת (disabled)
    // (הערך ריק, לא מבחינת מחרוזת אלא פשוט לא נכון כי לא עבר את כל התנאים. התנאי יכשל ו-allSelected שווה falsy לפי כללי JS)
    // אם הכל מלא (allSelected true), הכפתור יהיה פעיל
    btn.style.opacity = allSelected ? 1 : 0.5;
    // שימוש בתנאי קצר - אם allSelected נכון (true) ( הסימן "?" בודק האם נכון? האם כולם עברו את התנאי?) – אז השקיפות תהיה מלאה (1) אחרת ( הסימן ":") – חצי שקופה (0.5)
    btn.style.cursor = allSelected ? "pointer" : "not-allowed";
// שוב תנאי קצר:
// אם הכל מלא – הסמן יהפוך ליד שמציינת שניתן ללחוץ (pointer)
// אם לא – הסמן יראה כאילו אי אפשר ללחוץ (not-allowed)
}

function btnClicked() { // פונקציה שמופעלת כשלוחצים על כפתור השליחה
    const { fName, lName , notes} = getFormValues(); 
    // קורא לפונקציה getFormValues() שמחזירה אובייקט עם השדות של הטופס, למשל { fName: "ישראל", lName: "ישראלי" }
    //  עכשיו עושים את הפעולה שהסברנו קודם (destructuring) ומפרקים האובייקט הזה למשתנים נפרדים
    // ויש לנו שני משתנים חדשים בשם fName ו-lName שמכילים את הערכים מהטופס
    // במקום לקחת כל פעם את אותם הערכים בשתי פונקציות נפרדות, אנחנו משתמשים במשתנים האלה ישירות מה שהופך את הקוד ליעיל

    // מציג את הסיכום בחלונית הפופ-אפ
    document.getElementById("sumName").textContent = fName + " " + lName;
    // מזהה ה-span שבו יוצג השם המלא מהטופס (שם פרטי + רווח + שם משפחה)
    // השתמשנו ב-textContent במקום innerHTML: ממיר למחרוזת והופך את הטקסט לגולמי, נכון להגנה מפני קוד זדוני
    // כלומר - אם המשתמש יקליד תגיות שקשורות לקוד, ה-innerHTML ממיר ומפרש את ה-html לקוד בעוד ה-textContent משאיר את הטקסט כפי שהוקלד
    // לדוגמה: אם השם יהיה עטוף בתגית בולד - innerHTML יציג את השם בולט עם העיצוב ו-textContent יציג את השם וההקלדה של התגיות
    document.getElementById("sumPastry").textContent = selectedPastry; // מזהה ה-span שבו יוצג המאפה מהטופס (שם הערך של המאפה הנבחר)
    document.getElementById("sumFilling").textContent = selectedFilling; // מזהה ה-span שבו יוצג המילוי מהטופס (שם הערך של המילוי הנבחר)
    document.getElementById("sumToppings").textContent = selectedTopping.join(", ") || "ללא";
    // מזהה ה-span שבו יוצגו התוספות מהטופס (שמות הערכים של התוספות הנבחרות)
    // השתמשנו ב-join, פונקציה מובנית של מערכים שמציגה את המערך ומפרידה את התאים באמצעות פסיק
    // הסימן || כמו שלמדנו אופרטור לוגי של OR. אנחנו למדנו אופרטור לוגי רגיל, כאן השימוש שונה
    // כשלא משתמשים בו בתנאי if רגיל, הוא מחזיר ערך נכון (מה שלפני ה-||, נקרא truthy) ואם לא - הוא כנראה ריק/לא נכון לפי הכללים של JS (נקרא falsy)
    document.getElementById("sumNotes").textContent = notes || "אין בקשות מיוחדות";
    // מזהה ה-span שבו יוצגו ההערות מהטופס (הבקשות המיוחדות שהקליד)
    // תזכורת - הערך נלקח מהפונקציה getFormValues, שבזכותה נלקח הערך רק פעם אחת
    // לא חובה מאחר שזה לא אחד מהתנאים להפעלת הכפתור, אבל החלטנו להוסיף בכל זאת
    document.getElementById("popupOverlay").style.display = "block"; // מציג את הפופ-אפ עם רקע חצי שקוף ב-css
    document.getElementById("summaryDiv").style.display = "block"; // מציג את חלונית הפופ-אפ למשתמש עם סיכום ההזמנה שלו
}



function closeSummary() { // פונקציה לסגירת הפופ-אפ ואיפוס הטופס
    document.getElementById("popupOverlay").style.display = "none"; // מסתיר את הרקע השקוף
    document.getElementById("summaryDiv").style.display = "none";    // מסתיר את חלונית הסיכום
    document.getElementById("orderForm").reset(); 
    //הפונקציה המובנית reset מחזירה את כל השדות לערכים ההתחלתיים שלהם מבלי למחוק את האלמנטים 
    //כך היא מאפסת את הטופס כאשר המשתמש סוגר את החלונית 
    selectedFlavor = ""; // איפוס משתנה גלובלי -   איפוס מחרוזת הטעם
    selectedPastry = ""; // איפוס משתנה גלובלי - איפוס מחרוזת המאפה
    selectedFilling = ""; // איפוס משתנה גלובלי - איפוס מחרוזת המילוי
    selectedTopping = []; // איפוס משתנה גלובלי - איפוס מערך התוספות
    // הסתרת הטפסים של מתוק ומלוח
    document.getElementById("sweetForm").style.display = "none";
    document.getElementById("saltyForm").style.display = "none";
    activateBtn();  // קריאה לפונקציה לצורך בדיקה נוספת אם צריך להפעיל/לכבות את הכפתור לאחר האיפוס
    const allImages = document.querySelectorAll(  // בוחר את כל התמונות של מאפים, מילויים ותוספות
        // הפנוקציה המובנית querySelectorAll מכניסה לתוך משתנה את כל התמונות (תגית img)
        // שנמצאות בתוך div עם השם המזהה של תמונות המאפים, המילויים והתוספות
        // לדוגמה: כל האלמנטים עם תגית img שנמצאים בתוך ה-"id="pickSweetPastry (שאלו כל תמונות המאפים המתוקים)
        // כל אחד מייצג רשימה, הפסיק מחבר בין הרשימות השונות וה-querySelectorAll מכיל את כל הרשימות ברשימה אחת ארוכה
        "#pickSweetPastry img, #pickSweetFilling img, #pickSweetTopping img, #pickSaltyPastry img, #pickSaltyFilling img, #pickSaltyTopping img"
    );
    // מעבר על כל התמונות
    allImages.forEach(img => { 
        // במקום לולאות אינדקס ו-for of השתמשנו בפונקציה המובנית forEach: לולאה העוברת על מערך/רשימות של אלמנטים.
        // במקרה הזה, הלולאה עוברת על כל אלמנט img ברשימה שיצרנו
        // הסימן =>: פונקציית חץ, פונקציה מקוצרת, שקיבלה את הפרמטר הישיר img מהרשימה במשתנה allImages
        // ומריצה עליו את הקוד שבתוך הבלוק
        if (img.parentElement.id.includes("Topping")) {
            // תכונת האלמנט parentElement בודקת את האלמנט שעוטף את התמונה (ה-id של ה-div שעוטף את התמונות)
            // מבצע בדיקה האם שם ה-id של ה-div (ההורה) מכיל את המחרוזת "Topping"
            img.style.opacity = 0.5;  // התמונה תהיה חצי שקופה לתוספות שלא נבחרו
        } else {
            img.style.display = "none"; // אחרת, התמונות של המאפים והמילויים - תסתיר את כל התמונות של מאפים ומילויים שלא נבחרו
        }
    });
}