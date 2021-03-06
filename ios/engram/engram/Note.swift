//
//  Note.swift
//  engram
//
//  Created by Adam Berg on 2021-06-20.
//

import Foundation

struct Note: Identifiable, Decodable {
    var id: UUID
    var _id: String?
    var body: String?
    var date: String?
    var start: String?
    var type: String?
    var createdAt: Date?
    
    init(_id: String? = nil, body: String? = "", date: String? = nil, type: String? = "note", start: String? = nil) {
        self.id = UUID()
        self._id = _id
        self.body = body
        self.date = date
        self.type = type
        self.start = start
        self.createdAt = Date()
    }
}
