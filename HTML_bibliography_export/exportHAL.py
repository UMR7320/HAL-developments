#!/usr/bin/env python
# -*- coding: utf-8 -*- 
'''
Created on 23 sept. 2016

@author: Laurent Vanni

Laboratoire UMR 7320 - Bases, Corpus, Langage
(CNRS / Université Nice Sophia-Antipolis)
'''
import json
import urllib2
import sys

def format_author(authFullName_s):
    names = ""
    authors = ""
    for author in authFullName_s:
        author_args = author.split(" ")
        nom = " ".join(author_args[1:])
        names += nom
        
        prenom_compose = author_args[0].split("-")
        prenom = ""
        for p in prenom_compose:
            if p[0] == "É".decode('UTF8') or p[0] == "È".decode('UTF8'):
                prenom += "E"
            else:
                prenom += p[0]
            if len(p) > 1 and p[1] == "h":
                prenom += "h"
            prenom += ".-"
        prenom = prenom[:-1]
        authors += prenom.title() + " " +  nom.title() + ", "
    authors = authors[:-2]
    
    return authors, names

def format_scientificEditor(scientificEditor_s):
    try:
        scientificEditor_s = scientificEditor_s.replace("\," , ",")
        if scientificEditor_s and "(ed" not in scientificEditor_s:
            scientificEditor_s_args = scientificEditor_s.split(" and ")
            scientificEditor_s = ""
            for scientificEditor in scientificEditor_s_args:
                if "," in scientificEditor:
                    args = scientificEditor.split(",")
                    scientificEditor_s += args[1] + " " + args[0] + ", "
                else:
                    scientificEditor_s += scientificEditor + ", "
            if len(scientificEditor_s_args) > 1:
                scientificEditor_s = scientificEditor_s[:-2] + " (eds.)"
            else:
                scientificEditor_s = scientificEditor_s[:-2] + " (ed.)"
        scientificEditor_s, n = format_author(scientificEditor_s)
    except:
        ""
    
    scientificEditor_s = scientificEditor_s.title()
    scientificEditor_s = scientificEditor_s.replace("(E", "(e")
    return scientificEditor_s
    
def exportHAL(q):
    
    halAPI_URI  = "https://api.archives-ouvertes.fr/search/"
    query       = "?q=" + q
    params      = "&rows=9999&fl=halId_s,docType_s,authFullName_s,producedDate_s,conferenceStartDate_s,conferenceTitle_s,proceedings_s,journalPublisher_s,journalTitle_s,page_s,title_s,subTitle_s,bookTitle_s,publisher_s,scientificEditor_s,description_s" 

    hal_request = urllib2.urlopen(halAPI_URI + query + params).read()
    list_ref = json.loads(hal_request)
    
    biblio = {}

    for ref in list_ref["response"]["docs"]:
        try:
            docType_s = ref["docType_s"]
            
            # COMPILE AUTHOR
            authors, names = format_author(ref["authFullName_s"])
            
            # COMPILE DATE
            date = ""
            if ref["producedDate_s"]:
                date = ref["producedDate_s"]
            else:
                date = ref["conferenceStartDate_s"]
            if "-" in date:
                date = date.split("-")[0]
            elif "/" in date:
                date = date.split("/")[-1]
                if int(date) < 50:
                    date = "20" + date
                else:
                    date = "19" + date
            
            # COMPILE PAGE
            page= ""
            if ref.get("page_s", False):
                if "paraître".decode('UTF8') in ref["page_s"]:
                    page = "(à paraître)".decode('UTF8')
                elif "sous presse".decode('UTF8') in ref["page_s"]:
                    page = "(sous presse)".decode('UTF8')
                elif "http" in ref["page_s"]:
                    page = ref["page_s"]
                else:
                    page = "p. " + ref["page_s"]
                
            entry = ""
            
            # ARTICLES
            if docType_s == "ART":
                entry += authors + " "
                entry += "(" + date + "). " 
                entry += " ".join(ref["title_s"])
                entry += " ".join(ref.get("subTitle_s", [])) + " "
                if entry[-1] not in "?!.":
                    entry += ". "
                else:
                    entry += " "
                entry += "<i>" + ref.get("journalTitle_s", "") + ".</i> "
                if ref.get("publisher_s", False):
                    entry += ref["journalPublisher_s"] + ". "
                if ref.get("scientificEditor_s", False):
                    entry += format_scientificEditor(" and ".join(ref["scientificEditor_s"])) + ". "
                if page:
                    entry += page + ". "
            
            # COMMUNICATIONS
            elif docType_s == "COMM":
                if ref["proceedings_s"] == "0":
                    docType_s = "COMM_SANS" 
                entry += authors + " "
                entry += "(" + date + "). " 
                entry += " ".join(ref["title_s"])
                if entry[-1] not in "?!.":
                    entry += ". "
                else:
                    entry += " "
                entry += "<i>" + ref["conferenceTitle_s"] + "</i> "
                #entry += ref["journalPublisher_s"] + ". "
                if page:
                    entry += page + ". "                
            
            # OUVRAGE
            elif docType_s == "OUV":
                entry += authors + " "
                entry += "(" + date + "). " 
                entry += "<i>" + " ".join(ref["title_s"]) + "</i>"
                if entry[-1] not in "?!.":
                    entry += ". "
                else:
                    entry += " "
                entry += " ".join(ref.get("publisher_s", [])) + ". "
                if page:
                    entry += page + ". "
            
            # Chapitre d'OUVRAGE
            elif docType_s == "COUV":
                entry += authors + " "
                entry += "(" + date + "). " 
                entry += " ".join(ref["title_s"])
                if entry[-1] not in "?!.":
                    entry += ". "
                else:
                    entry += " "
                entry += "<i>" + ref["bookTitle_s"] + "</i> "
                if ref.get("publisher_s", False):
                    entry += " ".join(ref["publisher_s"]) + ". "
                if ref.get("scientificEditor_s", False):
                    entry += format_scientificEditor(" and ".join(ref["scientificEditor_s"])) + ". "
                if page:
                    entry += page + ". "  
            
            # Direction d'OUVRAGE/Revue
            elif docType_s == "DOUV":
                entry += authors + " "
                entry += "(" + date + "). " 
                entry += "<i>" + " ".join(ref["title_s"]) + "</i>"
                if entry[-1] not in "?!.":
                    entry += ". "
                else:
                    entry += " "
                if ref.get("publisher_s", False):
                    entry += " ".join(ref["publisher_s"]) + " "
                if page:
                    entry += page + ". " 
                    
            # AUTRE
            else:
                docType_s = "OTHER"
                entry += authors + " "
                entry += "(" + date + "). " 
                entry += " ".join(ref["title_s"])
                if entry[-1] not in "?!.":
                    entry += ". "
                else:
                    entry += " "
                entry += " ".join(ref.get("subTitle_s", []))
                if entry[-1] not in "?!.":
                    entry += ". "
                else:
                    entry += " "
                entry += ref.get("description_s" , "") + ". "
                if page:
                    entry += page + ". " 
    
            
            entry += " <a href='https://hal.archives-ouvertes.fr/" + ref["halId_s"] + "' target='blank'>" + "&lt;" + ref["halId_s"].replace("-","&#x2011;") + "&gt;</a>"
            
            entry = entry.replace("\,", ",")
            entry = entry.replace('"', '')
            entry = entry.replace(" .", ".")
            entry = entry.replace("..", ".")
            entry = entry.replace("?.", "?")
            entry = entry.replace(".</i>.", ".</i>")
            
            # ADD ENTRY 
            biblio[docType_s] = biblio.get(docType_s, {})
            biblio[docType_s][date] = biblio[docType_s].get(date, {})
            biblio[docType_s][date][names+entry] = entry
        except:
            print ref
            raise
    
    # COMPILE WEB RESULT
    print "<h4>" + str(sum([sum([len(x) for x in biblio[t].values()]) for t in biblio.keys()])) + " publications</h4>"
    
    if biblio.get("ART", False):
        print "<h2>" + str(sum([len(x) for x in (biblio["ART"].values())])) + " Articles</h2>"
        for annee in sorted(biblio["ART"].keys(), reverse=True):
            for key in sorted(biblio["ART"][annee].keys()):
                print "<p>" + biblio["ART"][annee][key].encode("UTF8") + "</p>"
    
    if biblio.get("OUV", False):
        print "<h2>" + str(sum([len(x) for x in (biblio["OUV"].values())])) + " Ouvrages</h2>"
        for annee in sorted(biblio["OUV"].keys(), reverse=True):
            for key in sorted(biblio["OUV"][annee].keys()):
                print "<p>" + biblio["OUV"][annee][key].encode("UTF8") + "</p>"
    
    if biblio.get("COUV", False):
        print "<h2>" + str(sum([len(x) for x in (biblio["COUV"].values())])) + " Chapitres d'ouvrages</h2>"
        for annee in sorted(biblio["COUV"].keys(), reverse=True):
            for key in sorted(biblio["COUV"][annee].keys()):
                print "<p>" + biblio["COUV"][annee][key].encode("UTF8") + "</p>"
    
    if biblio.get("DOUV", False):     
        print "<h2>" + str(sum([len(x) for x in (biblio.get("DOUV",{}).values())])) + " Directions d'ouvrages</h2>"
        for annee in sorted(biblio.get("DOUV",{}).keys(), reverse=True):
            for key in sorted(biblio["DOUV"][annee].keys()):
                print "<p>" + biblio["DOUV"][annee][key].encode("UTF8") + "</p>"
    
    if biblio.get("COMM", False):        
        print "<h2>" + str(sum([len(x) for x in (biblio["COMM"].values())])) + " Communications</h2>"
        for annee in sorted(biblio["COMM"].keys(), reverse=True):
            for key in sorted(biblio["COMM"][annee].keys()):
                print "<p>" + biblio["COMM"][annee][key].encode("UTF8") + "</p>"
    
    if biblio.get("COMM_SANS", False):        
        print "<h2>" + str(sum([len(x) for x in (biblio.get("COMM_SANS",{}).values())])) + " Communications sans acte</h2>"
        for annee in sorted(biblio.get("COMM_SANS",{}).keys(), reverse=True):
            for key in sorted(biblio["COMM_SANS"][annee].keys()):
                print "<p>" + biblio["COMM_SANS"][annee][key].encode("UTF8") + "</p>"
    
    if biblio.get("OTHER", False):
        print "<h2>" + str(sum([len(x) for x in (biblio["OTHER"].values())])) + " Autres</h2>"
        for annee in sorted(biblio["OTHER"].keys(), reverse=True):
            for key in sorted(biblio["OTHER"][annee].keys()):
                print "<p>" + biblio["OTHER"][annee][key].encode("UTF8") + "</p>"
    
if __name__ == '__main__':
    exportHAL(sys.argv[1])
