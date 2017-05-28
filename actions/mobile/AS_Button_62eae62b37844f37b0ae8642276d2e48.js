function AS_Button_62eae62b37844f37b0ae8642276d2e48(eventobject) {
    var username = kony.store.getItem("username");
    if (username) {
        Home.hamburger.left = "-87%";
        Home.MainContainer.left = "0%";
        Home.MainContainer.setEnabled(true);
        dashboardFrm.show();
    } else {
        alert("ログインしてください！");
    }
}