// Before login Flex Form appears, reset to old axis
function preshowLoginAnimation()
{
  loginFrm.homeBackLogin.centerX = "150%";
  loginFrm.FlexContainer0950404bc7b414d.centerX = "-50%";
}

// When screen/form appear, animation will be trigger.
function loginFormEffect()
{
	loginFrm.homeBackLogin.animate( // Xu li cho btn roi xuong
                           		kony.ui.createAnimation({
                                    "100": {
                                        "centerX": "50%",
                                        "stepConfig": {
                                            "timingFunction": kony.anim.EASIN_IN_OUT
                                        }
                                    }
                                }), {
                                    "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                    "duration": 0.5
                                });
	loginFrm.FlexContainer0950404bc7b414d.animate( // Xu li cho btn roi xuong
                                kony.ui.createAnimation({
                                  "100": {
                                    "centerX": "50%",
                                    "stepConfig": {
                                      "timingFunction": kony.anim.EASIN_IN_OUT
                                    }
                                  }
                                }), {
                                  "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                  "duration": 0.5
                                });
}

// Before signup Flex Form appears, reset to old axis
function preshowSignupAnimation()
{
  signupFrm.FlexContainer07ebfc72b047740.top = "-70%";
  signupFrm.homeBackLogin.top = "-15%";
}

// When screen/form appear, animation will be trigger.
function signupFormEffect()
{
	signupFrm.FlexContainer07ebfc72b047740.animate( // Flex animate from right to left
                         		kony.ui.createAnimation({
                                    "30": {
                                        "top": "20%",
                                        "stepConfig": {
                                            "timingFunction": kony.anim.EASIN_IN_OUT
                                        }
                                    },
                                    "50": {
                                        "top": "13%",
                                        "stepConfig": {
                                            "timingFunction": kony.anim.EASIN_IN_OUT
                                        }
                                    },
                                    "65": {
                                        "top": "20%",
                                        "stepConfig": {
                                            "timingFunction": kony.anim.EASIN_IN_OUT
                                        }
                                    },
                                    "85": {
                                        "top": "17%",
                                        "stepConfig": {
                                            "timingFunction": kony.anim.EASIN_IN_OUT
                                        }
                                    },
                                    "100": {
                                        "top": "20%",
                                        "stepConfig": {
                                            "timingFunction": kony.anim.EASIN_IN_OUT
                                        }
                                    }
                                }), 
      							{
                                  "delay":0,
                                  "iterationCount":1,
                                  "fillMode":kony.anim.FILL_MODE_FORWARDS,
                                  "duration":1
                                }
    );
 
	signupFrm.homeBackLogin.animate( // Button animate from right to left
    			kony.ui.createAnimation({
                                    "30": {
                                        "top": "85%",
                                        "stepConfig": {
                                            "timingFunction": kony.anim.EASIN_IN_OUT
                                        }
                                    },
                                    "50": {
                                        "top": "77%",
                                        "stepConfig": {
                                            "timingFunction": kony.anim.EASIN_IN_OUT
                                        }
                                    },
                                    "65": {
                                        "top": "85%",
                                        "stepConfig": {
                                            "timingFunction": kony.anim.EASIN_IN_OUT
                                        }
                                    },
                                    "85": {
                                        "top": "82%",
                                        "stepConfig": {
                                            "timingFunction": kony.anim.EASIN_IN_OUT
                                        }
                                    },
                                    "100": {
                                        "top": "85%",
                                        "stepConfig": {
                                            "timingFunction": kony.anim.EASIN_IN_OUT
                                        }
                                    }
                                }), 
      							{
                                  "delay":0,
                                  "iterationCount":1,
                                  "fillMode":kony.anim.FILL_MODE_FORWARDS,
                                  "duration":1
                                }                            
    );
}

function dashboardAnimation(){
  dashboardFrm.FlexContainer0e586a19f2ea149.animate( // Xu li cho btn roi xuong
          kony.ui.createAnimation(
           {
            "100": {
              "left": "0%",
              "stepConfig": {
                "timingFunction": kony.anim.EASIN_IN_OUT
              }
            }
           }),
    	  {
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.5
          });
}

function exitDashboardAnimation(){
  dashboardFrm.FlexContainer0e586a19f2ea149.animate(
          kony.ui.createAnimation(
           {
            "100": {
              "left": "-100%",
              "stepConfig": {
                "timingFunction": kony.anim.EASE_IN
              }
            }
           }),
    	  {
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 1
          });
  Home.show();
}

function aboutAnimation(){
	About.FlexContainer087ecc15625e242.animate( // Xu li cho btn roi xuong
          kony.ui.createAnimation(
           {
            "100": {
              "left": "0%",
              "stepConfig": {
                "timingFunction": kony.anim.EASIN_IN_OUT
              }
            }
           }),
    	  {
            "fillMode": kony.anim.FILL_MODE_FORWARDS,
            "duration": 0.5
          });
}
