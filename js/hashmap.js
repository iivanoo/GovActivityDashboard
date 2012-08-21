// ------------------------------------------------- //
// ------------------- HASHMAP --------------------- //
// @description
//    		javascript implementation of a java HashMap
// @author Giorgio Stefanoni
// @version 2009-02-08
//
// ------------------------------------------------- //

// ---> INDEX OF METHODS:
// clear; containsKey; containsValue; get; isEmpty; put;
// remove; size; values
/*
 * Object definition
 *
*/
function HashMap()
{
	this.map = new Object();
	this.size = 0;
}

/**
 * Resets the HashMap
*/
HashMap.prototype.clear = function()
{
	this.map = new Object();
	this.size = 0;
}

/**
 * Returns true if the map contains the key,
 * false otherwise.
*/
HashMap.prototype.containsKey = function(key)
{
	if (this.map[key] != undefined)
        return true;
	return false;
}

/**
 * Returns true, if the HashMap contains the value
 * false otherwise.
*/
HashMap.prototype.containsValue = function(val)
{
	for (var key in this.map) {
        if (this.map[key] == val)
            return true;
    }
	return false;
}

/**
 * Returns the element associated to the given
 * key. Null, if there is no such an element.
*/
HashMap.prototype.get = function(key) {
    if (this.map[key])
        return this.map[key]
    return null;
}

/**
 * Returns true if the HashMap is not containing
 * any element
*/
HashMap.prototype.isEmpty = function()
{
	if (this.getSize() == 0)
        return true;
	return false;
}

/**
 * Inserts an element at specific key.
 * If one was there it overriddes it.
 */
HashMap.prototype.put = function(key, val)
{
	if (this.map[key] == undefined)
        this.size++;
	this.map[key] = val;
}

/**
 * Removes an element of the hash map
 *
 */
HashMap.prototype.remove = function(key)
{
	if (this.map[key]==undefined)
        return;
    this.map[key] = undefined;
    this.size--;
}

/**
 * Returns the size of the map.
 * @return the size of map
 */
HashMap.prototype.getSize = function() {
    return this.size;
}

/**
 * Returns an unsorted mapay containing the
 * values in the HashMap
 * @return the mapay
 */
HashMap.prototype.values = function()
{
	var res = new Array();
    var i = 0;
	for (var key in this.map) {
        if (this.map[key] != undefined) {
            res[i] = this.map[key];
            i++;
        }
	}
	return res;
}

/**
 * Returns an unsorted array containing the
 * keys in the HashMap
 * @return the mapay
 */
HashMap.prototype.getKeys = function()
{
	var res = new Array();
    for (var key in this.map) {
        res.push(key);
    }
    return res;

}