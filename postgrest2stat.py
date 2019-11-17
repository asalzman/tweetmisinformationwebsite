import psycopg2
import unicodecsv as csv
from iso639 import languages

conn = psycopg2.connect(database = "test3", user = "postgres", password = "1234")
cursor = conn.cursor()

cursor.execute("SELECT DISTINCT(tweet_language) FROM search_index2 WHERE tweet_language IS NOT NULL");

langArray = cursor.fetchall()
langNum = {};

for i in range(len(langArray)):
	cursor.execute('SELECT COUNT(tweet_text) FROM search_index2 WHERE tweet_language=\'' + langArray[i][0] + "'");
	if langArray[i][0] == "iw":
		langNum["Hebrew"] = cursor.fetchone()[0]
	elif langArray[i][0] == "in":
		langNum["Indonesian"] = cursor.fetchone()[0]
	elif langArray[i][0] == "und":
		langNum["Undefined"] = cursor.fetchone()[0]
	else:
		langNum[languages.get(alpha2=langArray[i][0]).name] = cursor.fetchone()[0]


totalTweet = cursor.execute("SELECT COUNT(*) FROM search_index2")
totalUser = cursor.execute("SELECT DISTINCT COUNT('user_screen_name') FROM search_index2")
totalUserReportedLocations = cursor.execute("SELECT DISTINCT COUNT('user_reported_location') FROM search_index2")
totalLanguages = cursor.execute("SELECT DISTINCT COUNT('tweet_language') FROM search_index2")

perEng = round(((langNum['English'])/totalTweet) * 100, 5)
print(perEng)


conn.commit()
