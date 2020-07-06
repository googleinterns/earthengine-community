package handlers

import (
	"log"
	"net/http"
	data "modules/data/templates"
	"cloud.google.com/go/datastore"
	"io"
	"fmt"
)

type Templates struct {
	l *log.Logger 
	db *datastore.Client
}

/**
* Creates new templates handler with a provided logger instance.
*/
func NewTemplatesHandler(l *log.Logger, db *datastore.Client) *Templates {
	return &Templates{l, db}
}

/*
* Handler called on requests made to "/templates".
*/
func (t *Templates) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	queryParams, valid := r.URL.Query()["id"]
	
	if valid && len(queryParams[0]) > 1 {
		id := queryParams[0]; 
        t.getTemplateByID(id, rw, r)
        return
	}
	
	if r.Method == http.MethodGet {
		t.getTemplates(rw, r)
		return
	}

	if r.Method == http.MethodPost {
		t.addTemplate(rw, r)
		return
	}

	// Return method-not-allowed status for non-implemented methods.
	rw.WriteHeader(http.StatusMethodNotAllowed)
}

/*
* Helper method called on GET requests to "/api/v1/templates".
*/
func (t *Templates) getTemplates(rw http.ResponseWriter, r *http.Request) {
	templates := data.GetTemplates(t.db, t.l, r.Context())
	err := templates.ToJSON(rw)
	if err != nil {
		http.Error(rw, "Conversion to JSON was unsuccessful", http.StatusInternalServerError)
	}
}

/*
* Helper method called on GET requests to fetch a particular template.
*/
func (t *Templates) getTemplateByID(id string, rw http.ResponseWriter, r *http.Request) {
	template := data.GetTemplateByID(id, rw, t.db, t.l, r.Context())
	err := template.ToJSON(rw)
	if err != nil {
		http.Error(rw, "Conversion to JSON was unsuccessful", http.StatusInternalServerError)
	}
}

/*
* Helper method called on POST requests to "/templates". Adds a new template to the database.
*/
func (t *Templates) addTemplate(rw http.ResponseWriter, r *http.Request) {
	template := &data.Template{}
	err := template.FromJSON(r.Body)
	if err != nil {
		http.Error(rw, "Failed JSON conversion", http.StatusBadRequest)
	}

	t.l.Printf("Template: %#v", template)

	_, err = data.AddTemplate(template, t.db, rw, r.Context())
	if err != nil {
		fmt.Printf("%v", err)
		http.Error(rw, "Failed to save template in the database", http.StatusInternalServerError)
	}

	io.WriteString(rw, template.Id)
}

