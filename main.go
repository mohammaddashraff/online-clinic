package main

import (
	"fmt"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func main() {
	initConfig()

	r := mux.NewRouter()
	// CORS middleware configuration
	cors := handlers.CORS(
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedOrigins([]string{allowedOrigin}),
	)
	// Use CORS middleware
	r.Use(cors)
	// Define your routes
	r.HandleFunc("/signin", signInHandler).Methods("POST", "OPTIONS")
	r.HandleFunc("/signup", signUpHandler).Methods("POST", "OPTIONS")
	r.HandleFunc("/create-slot", createSlotHandler).Methods("POST", "OPTIONS")
	r.HandleFunc("/view-avail-slot", getDoctorSchedulesHandler).Methods("GET", "OPTIONS")
	r.HandleFunc("/select-dr", selectDrHandler).Methods("POST", "OPTIONS")
	r.HandleFunc("/choose-slot", chooseSlotHandler).Methods("POST", "OPTIONS")
	r.HandleFunc("/view-all-doctors", getAllDoctorNamesHandler).Methods("GET", "OPTIONS")
	r.HandleFunc("/cancel-appointment/{scheduleid}", cancelAppointmentHandler).Methods("DELETE", "OPTIONS")
	r.HandleFunc("/get-all-reservations/{patientID}", getAllReservationsHandler).Methods("GET", "OPTIONS")
	r.HandleFunc("/update-slot", updateSlotHandler).Methods("PUT", "OPTIONS")
	// Start the server
	fmt.Printf("Server is running on :%s\n", appPort)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", appPort), r))
}
