//
//  MainView.swift
//  engram
//
//  Created by Adam Berg on 2021-06-23.
//

import SwiftUI

struct MainView: View {
    @ObservedObject var vm = sharedLoginViewModel
    @State private var tab = 0
    
    var body: some View {
        if sharedLoginViewModel.loggedIn {
            TabView(selection: $tab) {
                DailyScreen(type: "all")
                    .tabItem {
                        Button(action: {tab = 0}) {
                            Image(systemName: "list.dash")
                            Text("All")
                        }
                    }.tag(0)
                DailyScreen(type: "note")
                    .tabItem {
                        Button(action: {tab = 1}) {
                            Image(systemName: "minus")
                            Text("Notes")
                        }.keyboardShortcut("n", modifiers: .control)
                    }.tag(1)
                DailyScreen(type: "task")
                    .tabItem {
                        Button(action: {tab = 2}) {
                            Image(systemName: "square")
                            Text("Tasks")
                        }.keyboardShortcut("t", modifiers: .control)
                        
                    }.tag(2)
                DailyScreen(type: "event")
                    .tabItem {
                        Button(action: {tab = 3}) {
                            Image(systemName: "circle")
                            Text("Events")
                        }.keyboardShortcut("e", modifiers: .control)
                    }.tag(3)
            }
            .navigationTitle("engram")
            .navigationBarTitleDisplayMode(.inline)
            .navigationViewStyle(StackNavigationViewStyle())
        } else {
            LoginScreen()
                .navigationTitle("engram")
                .navigationBarTitleDisplayMode(.inline)
                .navigationViewStyle(StackNavigationViewStyle())
        }
    }
}

struct MainView_Previews: PreviewProvider {
    static var previews: some View {
        MainView()
    }
}
