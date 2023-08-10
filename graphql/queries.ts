import { gql } from "@apollo/client";

export const GET_ALL_ATTESTATIONS = gql`
  query Attestations($schemaId: String!) {
    attestations(where: { schemaId: { equals: $schemaId } }) {
      decodedDataJson
      refUID
      schemaId
      attester
      timeCreated
      txid
      data
      recipient
      id
    }
  }
`;
export const GET_USER_ATTESTATIONS = gql`
  query Attestations($schemaId: String!, $attester: String!) {
    attestations(
      where: {
        AND: [
          { schemaId: { equals: $schemaId } }
          { attester: { equals: $attester } }
        ]
      }
    ) {
      decodedDataJson
      refUID
      schemaId
      attester
      timeCreated
      txid
      data
      recipient
      id
    }
  }
`;

export const GET_SIMPLE_ATTESTATION = gql`
  query Attestation($id: String!) {
    attestation(where: { id: $id }) {
      decodedDataJson
      refUID
      schemaId
      attester
      timeCreated
      txid
      data
      recipient
      id
    }
  }
`;
export const GET_ALL_ATTESTATIONS_BY_ID = gql`
  query Attestations($id: String!) {
    attestations(where: { id: { equals: $id } }) {
      decodedDataJson
      refUID
      schemaId
      attester
      timeCreated
      txid
      data
      recipient
      id
    }
  }
`;
export const GET_ATTESTATION_BY_REFID = gql`
  query Attestations($refUID: String!, $schemaId: String!) {
    attestations(
      where: {
        AND: [
          { refUID: { equals: $refUID } }
          { schemaId: { equals: $schemaId } }
        ]
      }
    ) {
      id
      data
      decodedDataJson
      recipient
      attester
      time
      timeCreated
      expirationTime
      revocationTime
      refUID
      revocable
      revoked
      txid
      schemaId
      ipfsHash
      isOffchain
    }
  }
`;
