deploy note

[deploy to dev]
0.gulp serve:dist
X.firebase-bolt rules.bolt
X.firebase deploy:rules -f pytrip-dev

*[deploy to stage]
0.gulp serve:dist --env=stage
1.gulp build --env=stage
2.firebase deploy --only hosting --project pytrip2017 -m v0.0.0
X.firebase-bolt rules.bolt
X.firebase deploy:rules -f pytrip2017

[deploy to prod]
0.gulp serve:dist --env=prod
1.gulp build --env=prod
2.firebase deploy --only hosting --project pytrip -m v0.0.0
X.firebase-bolt rules.bolt
X.firebase deploy:rules

more CLI detail in https://github.com/firebase/firebase-tools
