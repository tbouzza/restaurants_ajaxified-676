import { Controller } from "stimulus";
import { csrfToken } from "@rails/ujs";

export default class extends Controller {
  static targets = ['items', 'form'];


  connect() {

    // console.log(this.element);

    // console.log(this.itemsTarget);
    // 👆 console.log(document.querySelector('....'))

    // console.log(this.formTarget);
  }


  send(e) {
    e.preventDefault()

    fetch(this.formTarget.action, {
      method: 'POST',
      headers: { 'Accept': "application/json", 'X-CSRF-Token': csrfToken() },
      body: new FormData(this.formTarget)
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data.form)

        // Add the new review at the end of the list
        this.itemsTarget.insertAdjacentHTML('beforeend', data.inserted_item)

        // Replace the form with the incoming form
        this.formTarget.outerHTML = data.form

    });
  }
}
