import React, { useState } from "react";
import {View, Text,  StyleSheet,  Image, FlatList} from "react-native"
import moment from "moment/moment";
import { MaterialIcons } from '@expo/vector-icons'; 
import { useSelector } from "react-redux";

const getFormatedDate = (date, format = "MMM DD, YYYY") => moment(date).format(format);

const SearchResultScreen = () => {
    const {data, message} = useSelector((state) => state.search);
    const {result} = data

    return(
        <View style={styles.container}>
            {data && result?.length > 0 ? <FlatList
            keyExtractor={(index) => index.toString() + Math.random()}
            data={result}
            renderItem={({item}) => 
            <View style={styles.innerContainer}>
            <View style={styles.row}>
            <Text style={styles.categoriesDetail}>Name of Category:</Text>
           <Text style={styles.categoriesDetail}>{item?.categories?.toString()?.toUpperCase() || "Not Provided"}</Text>
            </View>
            {item?.icon_url === "not found" ? <Image source={{uri:item?.icon_url }} style={styles.icon_urlStyle}/> :<MaterialIcons name="error" size={34} color="black" /> }
            <View style={{marginVertical:10 }}>
            <Text style={styles.categoriesDetail}>Joke</Text>
           <Text>{item?.value}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.categoriesDetail}>Date Created:</Text>
           <Text style={styles.categoriesDetail}>{getFormatedDate(item?.created_at, "YYYY/MMM/DD")}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.categoriesDetail}>Date Updated:</Text>
           <Text style={styles.categoriesDetail}>{getFormatedDate(item?.updated_at, "YYYY/MMM/DD")}</Text>
            </View>
            </View>}    
            />: <View>
                <Text>No Joke Found!</Text>
                </View>}
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
      width: "100%",
      justifyContent: "center",
      padding: 20,
    
     
      borderRadius: 5
    },
    innerContainer:{
        marginVertical:10 ,
        width: "100%",
        backgroundColor: "#fff",
        padding: 20,
        shadowColor:"gray",
        shadowOffset: {
        width: 5,
        height: 5
        },
        shadowOpacity:0.1, 
    },
    icon_urlStyle:{
        width: 40,
        height:40,
        borderRadius:25,
        marginRight: 10
    },
    categoriesDetail:{
        fontSize: 18,
        fontWeight: "500"
    },
    row :{
        flexDirection:"row", justifyContent: "space-between", marginBottom:10 
    }
});

export default SearchResultScreen;

