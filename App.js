import { TextInput, Button, Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WebView } from 'react-native-webview';
/**
 * StAuth10244: I Adam Calleja, 000862779 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else
 * 
 * Assignment 5 - React Native App with Web API
 * Desc: 
 * This code uses an API call to retrieve data on different countries across the world and display information about each country.
 * At the bottom of the page, WebView is used in sync with Google Maps to show the location of the capital city of the country on the map.
 * Users use TextInput to type the name of a country in and the data will be displayed for the country below.
 * If they're feeling like learning about a new country they can press the Random Country button to learn about a new country.
 * Users can press Reset to reset the page to display no country data on the app.
 * The name of the country, capital, population , continent, and area of the country are displayed for each search as well as the capital location on a map.
 *  
 * API Source: https://restcountries.com
 * Author: Adam Calleja
 * Date: November 26th, 2023
 */


export default function App() {
  const [countryData, setCountryData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [search, setSearch] = useState('');

  /**
   * Retrieve all data from the API using axios and set country data
   */
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountryData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountryData();
  }, []);

  /**
   * Grabs value inside of TextInput and searches for the country
   * Looks for what country matches the search request and sets it to the selected country
   * Clears the searchbar after Search button is pressed
   * Displays information about country
   */
  function executeSearch() {
    let foundCountry = countryData.find(country =>
      country.name.common.toLowerCase() == search.toLowerCase()
    );
    setSelectedCountry(foundCountry);
    setSearch('');
  }

  /**
   * Removes the current country displayed on the screen and starts fresh
   */
  function resetSearch() {
    setSearch('');
    setSelectedCountry(null);
  }

  /**
   * Selects a random country in the list of countries by index
   * Gets country correlated with index and sets that as the selected country
   * Displays information about random country
   */
  function randomCountry() {
    const randomIndex = Math.floor(Math.random() * countryData.length);
    const randomCountry = countryData[randomIndex];
    setSelectedCountry(randomCountry);
    console.log(randomCountry.name.common, randomCountry.capital);
  }

  //Note:
  //Some countries do not have capitals (i.e. Macau), in the case of a country not having a capital, no map will be displayed.
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headertitle}>✨🗺️World Factbook📚✨</Text>
        <View>
          <TextInput
            style={styles.textinput}
            id="searchbar"
            value={search}
            onChangeText={setSearch}
            placeholder="Search for a country"
          />
          <Button
            title="Search"
            onPress={executeSearch}
          />
          <Button
            title="Reset"
            onPress={resetSearch}
          />
          <Button
            title="Random Country"
            onPress={randomCountry}
          />
        </View>
        <View>
          {selectedCountry && (
            <ScrollView style={styles.scrollviewstyle}>
              <View>
                <Image
                  source={{ uri: selectedCountry.flags.png }}
                  style={styles.flag}
                />
                <Text>Name: {selectedCountry.name.common}</Text>
                <Text>Capital: {selectedCountry.capital} </Text>
                <Text>Population: {selectedCountry.population.toLocaleString()} </Text>
                <Text>Continent: {selectedCountry.continents}</Text>
                <Text>Area: {selectedCountry.area}km^2</Text>
                {selectedCountry && selectedCountry.capitalInfo && selectedCountry.capitalInfo.latlng && (
                  <WebView
                    style={styles.map}
                    source={{ uri: 'https://www.google.com/maps/@' + selectedCountry.capitalInfo.latlng[0] + ',' + selectedCountry.capitalInfo.latlng[1] + ',10z' }}
                  />
                )}
              </View>
            </ScrollView>
          )}
        </View>
      </View>
      <View>
        <Text style={styles.footertext}>Adam Calleja 2023</Text>
        <Text style={styles.footertext}>Credit to RestCountries for the API</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  headertitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textinput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10
  },
  flag: {
    width: '100%',
    height: 100,
    resizeMode: 'contain'
  },
  map: {
    flex: 1,
    width: '100%',
    height: 300
  },
  scrollviewstyle: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black'
  },
  footertext: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }

});
