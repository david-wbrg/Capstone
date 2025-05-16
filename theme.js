const themeToggle = document.getElementById('themeToggle');

if (localStorage.getItem('theme') === 'dark'){
    document.body.classList.add('dark');
}

themeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');

        if (document.body.classList.contains('dark')){
            localStorage.setItem('theme', 'dark');
        }else{
            localStorage.setItem('theme', 'light');
        }
});

// Add keyboard shortcut for dark mode toggle 

document.addEventListener('keydown', function(e){
    if(e.shiftKey && e.key === 'D')
    {
        themeToggle.click();
    }
})