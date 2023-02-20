import './style.css'
import { z } from 'zod'
import moment from 'moment'

// URI for the clock-stma-production API
const uri = "https://clock-stma.onrender.com/"

// Interface for elements on the HTML page
interface Elements {
  clockDiv: HTMLDivElement | null
  add: HTMLButtonElement | null
  hours: HTMLInputElement | null
  minutes: HTMLInputElement | null
  subject: HTMLInputElement | null
  allSubject: HTMLDivElement | null
  select: HTMLSelectElement | null
  modal: HTMLDivElement | null
  buttonModal: HTMLButtonElement | null
  cancel: HTMLButtonElement | null
}

// Object that contains the references to the HTML elements
const elements: Elements = {
  clockDiv: document.querySelector<HTMLDivElement>("#clock"),
  add: document.querySelector<HTMLButtonElement>("#add"),
  hours: document.querySelector<HTMLInputElement>("#hours"),
  minutes: document.querySelector<HTMLInputElement>("#minutes"),
  subject: document.querySelector<HTMLInputElement>("#subject"),
  allSubject: document.querySelector<HTMLDivElement>("#all_subject"),
  select: document.querySelector<HTMLSelectElement>("#selectSalle"),
  modal: document.querySelector<HTMLDivElement>("#modal"),
  buttonModal: document.querySelector<HTMLButtonElement>("#buttonModal"),
  cancel: document.querySelector<HTMLButtonElement>("#cancel")
}

// Destructuring the elements object to access only clockDiv
const { clockDiv } = elements

// Function to update the clock with the given hours and minutes
const updateClock = (hours: number, minutes: number ) => {
  // Adding the hours and minutes to the current time using moment
  const currentTime = moment().add(hours, 'hours').add(minutes, 'minutes');
  // Formatting the time in the format 'HH:mm:ss'
  const currentTimeString = currentTime.format('HH:mm:ss');
  // Updating the innerHTML of the clockDiv with the current time
  clockDiv!.innerHTML = currentTimeString

  // Return the current time
  return currentTimeString
}

// Function to redirect the page based on the given text
const selectValue = (text: string) => 
  // Redirecting to index.html if the text is "DS"
  text === "DS" ? (window.location.href = "index.html") 
    // Redirecting to PERM.html if the text is "PERM"
    : text === "PERM" ? (window.location.href = "PERM.html")
    // Otherwise, return null
    : null

// Function for making fetch requests using Zod for validation
const zodFetch = async (state: string, db: string = "", value: object = {null: null}) => {
  // Define a Zod schema for the data to be sent in the request
  const mySchema = z.object({
    classroom: z.string(), // Classroom field, string type
    subject: z.string(), // Subject field, string type
    early: z.string(), // Early field, string type
    extra: z.string(), // Extra field, string type
    clock: z.string() // Clock field, string type
  })

  // If the state is "POST", send a POST request
  if (state === "POST") {
    // Validate the data using Zod and parse it
    const Data = mySchema.parse(value)

    // Make a POST request to the specified endpoint
    const response = await fetch(`${uri}${db}`, {
      method: "POST",
      body: JSON.stringify(Data), // Convert the data to a JSON string
      headers: {"Content-type": "application/json; charset=UTF-8"} // Set the content type header
    })
    const data = await response.json() // Get the response data in JSON format

    // Return the response data
    return data
  } 

  // If the state is "GET", send a GET request
  if (state === "GET") {
    // Define a Zod schema for the _id field
    const mySchemaId = z.object({
      _id: z.string() // _id field, string type
    })

    // Extend the mySchema object with the mySchemaId object
    const mySchemaExtend = mySchema.merge(mySchemaId)

    // Type alias for the inferred type of the mySchema object
    type StringType = z.infer<typeof mySchema>

    // Async function for making the GET request
    const getClock = async (): Promise<StringType[]> => {
      // Make a GET request to the specified endpoint
      const response = await fetch(`${uri}${db}`)
      const json = await response.json() // Get the response data in JSON format
      // Validate and parse the response data using Zod
      const data = z.array(mySchemaExtend).parse(json)
      // Return the parsed data
      return data
    }

    // Return the result of calling the getClock function
    return getClock()
  }
}

// Export the zodFetch function and other constants
export { zodFetch, elements, updateClock, selectValue, uri }


