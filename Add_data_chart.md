#Add data from Uri

# Introduction #

Upload data into the model. Update chart view.


# Details #

look for main.py file

apps\_binding.append(('/model/bs/(\d**)', BloodSuger))**

apps\_binding.append(('/model/pf/(\d**)/(\d**).(\d**)', Asthma))**

apps\_binding.append(('/model/bp/(\d**)/(\d**)/(\d**)', BloodPressure))**

apps\_binding.append(('/model/fo/(\d**).(\d**)', Fometer))

apps\_binding.append(('/model/bk/(\d**)/(\d**)/(\d**).(\d**)/(\d**).(\d**)', Bike))

apps\_binding.append(('/model/ru/(\d**)/(\d**)/(\d**).(\d**)/(\d**).(\d**)', Run))






# Example #

port = 7999

If you want to updload Bloodsuger information. http://localhost:7999/model/bs/140

If you want to updload Asthma information. http://localhost:7999/model/pf/218/2.36

If you want to updload BloodPressure information http://localhost:7999/model/bp/136.98.72

If you want to updload Fometer information. http://localhost:7999/model/fo/36.2

If you want to updload Bike information http://localhost:7999/model/bk/5/36/74.3/22.8

If you want to updload Run information. http://localhost:7999/model/ru/5/36/74.3/22.8


And look "sucesses"

Look your chart view