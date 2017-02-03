/**
 * Edge of a face in a mesh.
 */
import Vertex from './vertex';

class Edge {

    /** 
     * @constructor
     * @param {Number} i1 the first Vertex (counter-clockwise) in the Edge.
     * @param {Number} i2 the second Vertex (counter-clockwise) in the Edge.
     * @param {Array[Vertex]} vertexArr the parent Vertex array.
     */
    constructor ( i1, i2, vertexArr ) {

        this.i1 = i1;

        this.i2 = i2;

        this.v1 = vertexArr[ i1 ];  // first Vertex encountered, moving clockwise

        this.v2 = vertexArr[ i2 ];  // second Vertex encountered, moving clockwise

        if ( ! this.valid() ) {

            console.error( 'Edge error: i1=' + i1 + ' i2:' + i2 + ' v1:' + v1 + ' v2:' + v2 );

        }

        // Let the vertices know they START this edge (forward, clockwise)

        this.v1.setEdge( this, 0 );

        // NOTE: setting the second point = 12 connections (degenerate)
        // NOTE: max of 6 connections, sometimes less.
        // NOTE: backward, counter-clockwise

        this.v2.setEdge( this, 1 );

        // Save a reference to the overall Vertex array

        this.vertexArr = vertexArr;

        // Previous and next Edges

        this.prev = null;

        this.next = null;

        this.idx = i1 + '-' + i2;

    }

    valid () {

        if ( this.v1 && this.v2 ) {

            return true;

        }

        return false;
    }

    /** 
     * check if this Edge is in a supplied array.
     * @param {Array[Edge]} edgeArr an array of Vertex objects.
     * @returns {Boolean} if we are in the supplied array, return true, else false.
     */
    inList ( edgeArr ) {

        if ( edgeArr.indexOf( this ) === -1 ) {

            return false;

        }

        return true;

    }

    /** 
     * Determine if a Vertex is part of this Edge.
     */
    hasVertex ( otherVertex ) {

        if( this.v1 === otherVertex.v1 || this.v2 === otherVertex.v2 ) {

            return true;

        }

        return false;

    }

    /** 
     * Determine if two Edges share the same Coords (object reference, not value).
     * @param {Edge} other another Edge object
     * @param {Boolen} sameWind if set to true, objects have to have the same Coords 
     * in the same order. Otherwise, a--b is equivalent to b--a, which is common in 
     * indices referencing a set of Vertex objects.
     * @returns {Boolean} if shared Coords, return True, else false
     */
    isEqual ( other, sameWind = false ) {

        // Equal, and in same order 
        if( this.v1 === other.v1 && this.v2 === other.v2 ) {

            return true;

        } else if ( sameWind === false ) {

            if( this.hasVertex( other.v1 ) && this.hasVertex( other.v2 ) ) {

                return true;

            }

        }

        return false;

    }

    /**
     * Compute midpoint of the two Vertex objects
     * @returns{Vertex} this midpoint for position AND texture coordiantes.
     */
    midPoint () {

        // compute average texture coordinate

        return this.v1.clone().average( this.v2 );

    }

    /** 
     * Clone the Edge, optionally reversing the vertex order
     * @param {Boolean} flip if true, reverse Vertex order.
     */
    clone ( flip ) {

        if ( flip ) {

            return new Edge( this.vertexArr[ this.i2 ], this.vertexArr[ this.i1 ], this.vertexArr );

        } else {

            return new Edge( this.vertexArr[ this.i1 ], this.vertexArr[ this.i2], this.vertexArr );

        }

    }

}

export default Edge;