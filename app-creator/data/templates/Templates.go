package templates_data 

import (
	"encoding/json"
	"io"
	"context"
	"cloud.google.com/go/datastore"
	"log"
	"net/http"
)

type Template struct {
	Id string `json:"id"` 
	Name string `json:"name"`
	ImageUrl string `json:"imageUrl"`
	Template string `json:"template" datastore:",noindex"`
}

type Templates []*Template

/**
* Converts an array of Template data into JSON.
*/
func (t *Templates) ToJSON(w io.Writer) error {
	encoder := json.NewEncoder(w)
	return encoder.Encode(t)
}

/**
* Converts a Template into JSON.
*/
func (t *Template) ToJSON(w io.Writer) error {
	encoder := json.NewEncoder(w)
	return encoder.Encode(t)
}

/**
* Converts a JSON representation of a Template object into a Template instance. 
*/
func (t *Template) FromJSON(r io.Reader) error {
	e := json.NewDecoder(r)
	return e.Decode(t)
}

/**
* Returns array of templates.
*/
func GetTemplates(db *datastore.Client, l *log.Logger, ctx context.Context) Templates {
	templates := []*Template{}
	_, err := db.GetAll(ctx, datastore.NewQuery("Template"), &templates)
	if err != nil {
		l.Fatal("Unable to fetch templates\n")
	}

	return templates
}

/**
* Returns array of templates.
*/
func GetTemplateByID(id string, rw http.ResponseWriter, db *datastore.Client, l *log.Logger, ctx context.Context) *Template {
	key := datastore.NameKey("SavedTemplate", id, nil)
	template := new(Template)
	err := db.Get(ctx, key, template)
	if err != nil {
		http.Error(rw, "Error fetching template from database", http.StatusInternalServerError)
	}
	return template
}

/**
* Adds a template to the database and returns its corresponding uuid.
*/
func AddTemplate(t *Template, db *datastore.Client, rw http.ResponseWriter, ctx context.Context) (*datastore.Key, error) {
	key := datastore.NameKey("SavedTemplate", t.Id, nil)
	return db.Put(ctx, key, t)
} 
