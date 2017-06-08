[deploy note]
!need update to last version tools

deploy to dev
0.gulp serve:dist --env dev
X.gulp build --env dev
X.firebase deploy --only hosting --project pytrip-dev -m v0.0.0
-3.firebase-bolt rules.bolt
-4.firebase deploy:rules -f pytrip-dev

deploy to stage
0.gulp serve:dist --env stage
1.gulp build --env stage
2.firebase deploy --only hosting --project pytrip-stage -m v0.0.0

deploy to prod
0.gulp serve:dist
1.gulp build
2.firebase deploy --only hosting --project pytrip -m v0.0.0
-3.firebase-bolt rules.bolt
-4.firebase deploy:rules

more CLI detail in https://github.com/firebase/firebase-tools
