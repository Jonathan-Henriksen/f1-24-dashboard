Custom Multi-Functional Display(MFD) for the F1 24 games, based on the F1-24-Telemetry base repo.

Written as a simple web application, that utilizes the telemetry server from its base repository,
combined with a sqlite3 database, which the packet data is written to, so that the frontend can query it using a simple web api,
and display real time racing data in the browser, so that you can use either your laptop or even just a small tablet mounted behind the steering wheel for full immersion.

Setup:
In order to navigate the MFD from the controller/steering wheel, you must map the Custom UDP Action 1 and 2 for navigating left and right respectively. (More bindings to come. Probably).
