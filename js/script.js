const CurrentDate = document.querySelector(".current-date")
const DaysTag = document.querySelector(".days")
const NextPrevIcons = document.querySelectorAll("span")

let date = new Date(),
CurrentYear = date.getFullYear(),
CurrentMonth = date.getMonth()

const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const RenderCalendar = () => {
    let FirstDayOfMonth = new Date(CurrentYear, CurrentMonth, 1).getDay()
    let LastDateOfMonth = new Date(CurrentYear, CurrentMonth + 1, 0).getDate()
    let LastDateOfLastMonth = new Date(CurrentYear, CurrentMonth, 0).getDate()
    let LastDayOfMonth = new Date(CurrentYear, CurrentMonth, LastDateOfMonth).getDay()
    let LiTag = ""

    for (let i = FirstDayOfMonth ; i > 0 ; i--) {
        LiTag += `<li class="inactive">${LastDateOfLastMonth - i + 1}</li>`
    }

    for (let i = 1 ; i <= LastDateOfMonth ; i++) {
        let Today = i === date.getDate() && CurrentMonth === new Date().getMonth()
        && CurrentYear === new Date().getFullYear() ? "active" : ""
        LiTag += `<li class="${Today}">${i}</li>`
    }

    for (let i = LastDayOfMonth ; i < 6 ; i++) {
        LiTag += `<li class="inactive">${i - LastDayOfMonth + 1}</li>`
    }

    CurrentDate.innerText = `${Months[CurrentMonth]} ${CurrentYear}`
    DaysTag.innerHTML = LiTag
}

RenderCalendar()

NextPrevIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        CurrentMonth = icon.id === "prev" ? CurrentMonth - 1 : CurrentMonth + 1
        if(CurrentMonth < 0 || CurrentMonth > 11) {
            date = new Date(CurrentYear, CurrentMonth)
            CurrentYear = date.getFullYear()
            CurrentMonth = date.getMonth()
        } else {
            date = new Date()
        }
        RenderCalendar()
    })
})